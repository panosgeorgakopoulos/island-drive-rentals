import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { BookingCheckoutClient } from "@/components/BookingCheckoutClient"
import { calculateTotal } from "@/lib/pricing"

export default async function BookingPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string, lang: string }>,
  searchParams: Promise<{ start?: string, end?: string, location?: string }>
}) {
  const { id, lang } = await params
  const { start, end, location } = await searchParams
  const session = await auth()

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to log in or create an account to complete your booking.</p>
          <div className="flex gap-4">
            <Link href="/login" className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition">Log in</Link>
            <Link href="/register" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">Sign up</Link>
          </div>
        </div>
      </div>
    )
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id }
  })

  if (!vehicle) notFound()

  // Calculate summary from URL params
  const startDate = start ? new Date(start) : null
  const endDate = end ? new Date(end) : null

  let pricingBreakdown = { days: 0, baseTotal: 0, surgeAmount: 0, discountAmount: 0, finalTotal: 0, hasSurge: false, hasDiscount: false, discountPercent: 0 }
  
  if (startDate && endDate) {
    pricingBreakdown = calculateTotal(vehicle, startDate, endDate)
  }

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20 pt-10">
      <BookingCheckoutClient 
        vehicle={vehicle} 
        user={session.user} 
        start={start || ""} 
        end={end || ""} 
        location={location || "Athens Airport"} 
        pricing={pricingBreakdown}
        lang={lang}
      />
    </div>
  )
}
