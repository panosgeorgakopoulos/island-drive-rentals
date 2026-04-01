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
