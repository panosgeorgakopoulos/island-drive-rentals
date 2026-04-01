import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { appendToSheet } from "@/lib/sheets"

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
    console.error(`Webhook Error: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any
    const bookingId = session.metadata?.bookingId

    if (bookingId) {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { 
          status: "confirmed",
          paymentIntentId: session.payment_intent as string
        },
        include: { user: true, vehicle: true }
      })

      if (process.env.GOOGLE_SPREADSHEET_ID) {
        await appendToSheet([
          new Date().toISOString(),
          booking.user.email,
          `${booking.vehicle.name} - ${booking.vehicle.type}`,
          booking.startDate.toISOString().split('T')[0],
          booking.endDate.toISOString().split('T')[0],
          booking.pickupLocation,
          booking.totalPrice,
          booking.extras || "None",
          "confirmed"
        ], process.env.GOOGLE_SPREADSHEET_ID)
      }

      // TODO: Send Confirmation Email 
    }
  }

  return new NextResponse('OK', { status: 200 })
}
