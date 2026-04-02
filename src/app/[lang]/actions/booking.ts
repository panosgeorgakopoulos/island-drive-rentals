"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"

export async function cancelBookingAction(bookingId: string) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required.");
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "cancelled" }
  })

  revalidatePath("/admin/bookings")
}

export async function cancelMyBooking(bookingId: string) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) throw new Error("Booking not found")
  if (booking.userId !== session.user.id) throw new Error("Unauthorized")

  const hoursUntilStart = (booking.startDate.getTime() - Date.now()) / (1000 * 60 * 60)
  if (hoursUntilStart < 48) {
    throw new Error("Cannot cancel within 48 hours of pickup")
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "cancelled" }
  })

  // TODO: Stripe Refund API call goes here
  // stripe.refunds.create({ payment_intent: booking.paymentIntentId })

  revalidatePath("/profile")
}

export async function deleteBookingAction(bookingId: string) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required.");
  }

  await prisma.booking.delete({
    where: { id: bookingId }
  })

  revalidatePath("/admin/bookings")
}

