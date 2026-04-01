import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { appendToSheet } from "@/lib/sheets"

// Mock Webhook for local development without actual Stripe payments
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const bookingId = searchParams.get("bookingId")

  if (!bookingId) {
    return new NextResponse("Missing bookingId", { status: 400 })
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "confirmed" },
      include: { user: true, vehicle: true }
    })

    // Append to Google Sheet
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

    return NextResponse.redirect(new URL("/success?mock=true", req.url))
  } catch (error) {
    console.error("Mock webhook error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
