import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

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
    const pickupLocation = formData.get("pickupLocation") as string

    if (!vehicleId || !startDateStr || !endDateStr) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (days <= 0) {
      return new NextResponse("Invalid date range", { status: 400 })
    }

    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } })
    if (!vehicle) {
      return new NextResponse("Vehicle not found", { status: 404 })
    }

    const totalPrice = vehicle.basePrice * days

    // Create a pending booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        vehicleId,
        startDate,
        endDate,
        pickupLocation,
        totalPrice,
        status: "pending"
      }
    })

    // Create Stripe checkout session
    const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY
    if (!STRIPE_SECRET || STRIPE_SECRET === "sk_test_mock") {
      // If no valid stripe key, mock the checkout success (for development without Stripe)
      return NextResponse.redirect(new URL(`/api/webhook-mock?bookingId=${booking.id}`, req.url))
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Rental: ${vehicle.name}`,
              description: `From ${startDateStr} to ${endDateStr} at ${pickupLocation}`,
            },
            unit_amount: Math.round(totalPrice * 100), // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/book/${vehicle.id}`,
      client_reference_id: booking.id,
      metadata: {
        bookingId: booking.id
      }
    })

    if (checkoutSession.url) {
      return NextResponse.redirect(new URL(checkoutSession.url))
    }
    
    return new NextResponse("Error creating checkout session", { status: 500 })

  } catch (error) {
    console.error("Checkout POST Error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
