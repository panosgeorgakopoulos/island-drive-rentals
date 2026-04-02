import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { appendBookingToSheet } from "@/lib/sheets"
import { sendBookingConfirmation } from "@/lib/email"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object as any
    const meta = stripeSession.metadata

    if (!meta?.vehicleId || !meta?.userId || !meta?.startDate || !meta?.endDate) {
      console.error("Webhook: Missing metadata in Stripe session", meta)
      return new NextResponse("Missing metadata", { status: 400 })
    }

    const startDate = new Date(meta.startDate)
    const endDate = new Date(meta.endDate)
    const totalPrice = parseFloat(meta.totalPrice)
    const pickupLocation = meta.pickupLocation || "Athens Airport"

    try {
      const booking = await prisma.$transaction(async (tx) => {
        // 1. Check for overlapping CONFIRMED bookings (concurrent-safe inside transaction)
        const overlapping = await (tx as any).booking.findFirst({
          where: {
            vehicleId: meta.vehicleId,
            status: "confirmed",
            startDate: { lt: endDate },    // existing starts before requested ends
            endDate: { gt: startDate },    // existing ends after requested starts
          }
        })

        if (overlapping) {
          throw new Error("VEHICLE_UNAVAILABLE")
        }

        // 2. Create CONFIRMED booking atomically
        return (tx as any).booking.create({
          data: {
            userId: meta.userId,
            vehicleId: meta.vehicleId,
            startDate,
            endDate,
            pickupLocation,
            extras: meta.extras || "",
            totalPrice,
            status: "confirmed",
            paymentIntentId: stripeSession.payment_intent as string
          },
          include: { user: true, vehicle: true }
        })
      })

      // 3. Google Sheets sync (fire-and-forget)
      appendBookingToSheet(booking as any).catch(console.error)

      // 4. Send email confirmation
      if (booking.user.email) {
        await sendBookingConfirmation(booking.user.email, booking)
      }

    } catch (err: any) {
      if (err.message === "VEHICLE_UNAVAILABLE") {
        // Payment succeeded but vehicle was booked concurrently.
        // In production you would issue a Stripe refund here.
        console.error("CRITICAL: Stripe payment succeeded but vehicle is no longer available. Refund required.", {
          paymentIntent: stripeSession.payment_intent,
          vehicleId: meta.vehicleId,
          dates: `${meta.startDate} - ${meta.endDate}`
        })
        return new NextResponse("Conflict: vehicle unavailable", { status: 409 })
      }
      throw err
    }
  }

  return new NextResponse('OK', { status: 200 })
}
