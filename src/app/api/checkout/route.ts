import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { appendToSheet } from "@/lib/sheets"
import { calculateTotal } from "@/lib/pricing"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    const formData = await req.formData()
    const vehicleId = formData.get("vehicleId") as string
    const startDateStr = formData.get("startDate") as string
    const endDateStr = formData.get("endDate") as string
    const pickupLocation = (formData.get("pickupLocation") as string) || "Athens Airport"
    const supportedLocales = ['en', 'el', 'fr', 'it', 'es', 'de', 'sv', 'no']
    const rawLang = (formData.get("lang") as string) || "en"
    const lang = supportedLocales.includes(rawLang) ? rawLang : "en"

    if (!vehicleId || !startDateStr || !endDateStr) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 })
    }

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    if (days <= 0) {
      return new NextResponse("Invalid date range", { status: 400 })
    }

    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } })
    if (!vehicle) {
      return new NextResponse("Vehicle not found", { status: 404 })
    }

    // --- Parse incoming extras to backend logic ---
    const extrasStr = (formData.get("extras") as string) || ""
    let extrasDailyCost = 0
    if (extrasStr.includes("Full Protection Insurance")) extrasDailyCost += 15
    if (extrasStr.includes("Child Seat")) extrasDailyCost += 5
    if (extrasStr.includes("Additional Driver")) extrasDailyCost += 10

    // --- Backend-calculated price using secure Pricing Engine ---
    const { finalTotal, days: computedDays } = calculateTotal(vehicle, startDate, endDate)
    const totalPrice = finalTotal + (computedDays * extrasDailyCost)

    // --- Check if Stripe is configured ---
    const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY
    const useStripe = STRIPE_SECRET && STRIPE_SECRET !== "sk_test_mock" && STRIPE_SECRET.startsWith("sk_")

    if (useStripe) {
      // ========================================================
      // STRIPE MODE: Create checkout session with metadata only.
      // The booking is created ONLY inside the webhook on success.
      // ========================================================
      const checkoutSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: `Rental: ${vehicle.name}`,
                description: `${startDateStr} to ${endDateStr} at ${pickupLocation}`,
              },
              unit_amount: Math.round(totalPrice * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/${lang}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/${lang}/book/${vehicle.id}?start=${startDateStr}&end=${endDateStr}`,
        metadata: {
          userId: session.user.id,
          vehicleId: vehicle.id,
          startDate: startDateStr,
          endDate: endDateStr,
          pickupLocation,
          extras: extrasStr,
          totalPrice: String(totalPrice),
        }
      })

      if (checkoutSession.url) {
        return NextResponse.json({ url: checkoutSession.url })
      }

      return new NextResponse("Error creating checkout session", { status: 500 })
    }

    // ========================================================
    // MOCK / DEV MODE: No Stripe — atomic booking creation now.
    // ========================================================
    try {
      const booking = await prisma.$transaction(async (tx) => {
        // 1. Check for overlapping CONFIRMED bookings
        const overlapping = await (tx as any).booking.findFirst({
          where: {
            vehicleId: vehicle.id,
            status: "confirmed",
            startDate: { lt: endDate },
            endDate: { gt: startDate },
          }
        })

        if (overlapping) {
          throw new Error("VEHICLE_UNAVAILABLE")
        }

        // 2. Create CONFIRMED booking atomically
        return (tx as any).booking.create({
          data: {
            userId: session.user!.id!,
            vehicleId: vehicle.id,
            startDate,
            endDate,
            pickupLocation,
            extras: extrasStr,
            totalPrice,
            status: "confirmed",
            paymentIntentId: `mock_${Date.now()}`
          },
          include: { user: true, vehicle: true }
        })
      })

      // 3. Google Sheets sync (non-blocking, after transaction)
      if (process.env.GOOGLE_SPREADSHEET_ID) {
        appendToSheet([
          new Date().toISOString(),
          booking.user.email,
          `${booking.vehicle.name} - ${booking.vehicle.type}`,
          booking.startDate.toISOString().split('T')[0],
          booking.endDate.toISOString().split('T')[0],
          booking.pickupLocation,
          booking.totalPrice,
          booking.extras || "None",
          "confirmed"
        ], process.env.GOOGLE_SPREADSHEET_ID).catch(console.error)
      }

      return NextResponse.json({ url: new URL(`/${lang}/success?mock=true`, req.url).toString() })
    } catch (err: any) {
      if (err.message === "VEHICLE_UNAVAILABLE") {
        return NextResponse.json({ 
          url: new URL(`/${lang}/book/${vehicle.id}?start=${startDateStr}&end=${endDateStr}&error=unavailable`, req.url).toString() 
        })
      }
      throw err
    }

  } catch (error) {
    console.error("Checkout POST Error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
