import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { appendBookingToSheet } from "@/lib/sheets"
import { sendBookingConfirmation } from "@/lib/email"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return new NextResponse("Missing stripe-signature", { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object as any
    const meta = stripeSession.metadata

    if (!meta?.bookingId) {
      console.error("❌ Webhook Error: Missing bookingId in Stripe session metadata", meta)
      return new NextResponse("Missing bookingId", { status: 400 })
    }

    try {
      // Find the pending booking and update it to confirmed
      const booking = await prisma.booking.update({
        where: { id: meta.bookingId },
        data: {
          status: "confirmed",
          paymentIntentId: stripeSession.payment_intent as string
        },
        include: { user: true, vehicle: true }
      })

      // 1. Google Sheets sync (fire-and-forget)
      appendBookingToSheet(booking as any)
        .then(success => {
          if (success) console.log(`✅ Sheets sync successful for booking ${booking.id}`)
          else console.error(`❌ Sheets sync failed for booking ${booking.id}`)
        })
        .catch(err => console.error(`❌ Sheets sync unexpected error:`, err))

      // 2. Send email confirmation
      if (booking.user.email) {
        await sendBookingConfirmation(booking.user.email, booking)
      }

      console.log(`✅ Webhook Success: Booking ${booking.id} confirmed via Stripe.`)

    } catch (err: any) {
      console.error(`❌ Webhook Error: Failed to update booking ${meta.bookingId}:`, err.message)
      return new NextResponse("Database update failed or booking not found", { status: 500 })
    }
  }

  return new NextResponse('OK', { status: 200 })
}
