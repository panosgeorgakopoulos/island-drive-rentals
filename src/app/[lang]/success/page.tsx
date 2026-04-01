import Link from "next/link"
import { CheckCircle, Calendar, MapPin, Car, FileText } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { PrintButton } from "@/components/PrintButton"
import { getDictionary } from "@/lib/dictionaries"

export default async function SuccessPage({ 
  searchParams, params 
}: { 
  searchParams: Promise<{ bookingId?: string, session_id?: string, mock?: string }>,
  params: Promise<{ lang: string }>
}) {
  const { bookingId, session_id } = await searchParams
  const { lang } = await params
  const dict = await getDictionary(lang)
  const session = await auth()
  
  let booking = null

  if (bookingId) {
    booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { vehicle: true, user: true }
    })
  } else if (session_id) {
    // Look up the booking by the Stripe checkout session's payment_intent
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
      const paymentIntentId = typeof checkoutSession.payment_intent === "string"
        ? checkoutSession.payment_intent
        : checkoutSession.payment_intent?.id

      if (paymentIntentId) {
        booking = await prisma.booking.findFirst({
          where: { paymentIntentId },
          include: { vehicle: true, user: true }
        })
      }
    } catch (err) {
      console.error("Failed to retrieve Stripe checkout session:", err)
    }

    // Fall back to the most recent booking for this user if the webhook hasn't fired yet
    if (!booking && session?.user?.id) {
      booking = await prisma.booking.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: { vehicle: true, user: true }
      })
    }
  } else if (session?.user?.id) {
    booking = await prisma.booking.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: { vehicle: true, user: true }
    })
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border text-center max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">No Recent Booking Found</h2>
          <Link href={`/${lang}/profile`} className="text-blue-600 font-medium hover:underline">View My Profile</Link>
        </div>
      </div>
    )
  }

  const invoiceNumber = `INV-${booking.id.slice(0, 8).toUpperCase()}`
  const days = Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 pt-12 pb-24">
      {/* Printable Invoice Container */}
      <div className="bg-white max-w-3xl w-full rounded-2xl p-8 md:p-12 border shadow-lg print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-8 mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center print:border print:border-green-500">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{dict.successPage?.title || 'Booking Confirmed'}</h1>
              <p className="text-gray-500 font-medium">{dict.successPage?.thanks || 'Thank you for choosing Island Drive Rentals'}</p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">{dict.successPage?.invoiceReference || 'Invoice / Reference'}</div>
            <div className="text-2xl font-black text-gray-900">{invoiceNumber}</div>
            <div className="text-sm font-medium mt-1">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full inline-block">
                {dict.successPage?.paidInFull || 'Paid in Full'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Reservation Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-4">
              <Car size={16} /> {dict.successPage?.customerVehicle || 'Customer & Vehicle'}
            </h3>
            <div className="bg-gray-50 p-5 rounded-xl print:bg-transparent print:border print:p-4">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">{dict.successPage?.customerName || 'Customer Name'}</dt>
                  <dd className="font-bold text-gray-900">{booking.user.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">{dict.successPage?.customerEmail || 'Customer Email'}</dt>
                  <dd className="font-bold text-gray-900">{booking.user.email}</dd>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <dt className="text-gray-500">{dict.successPage?.vehicle || 'Vehicle'}</dt>
                  <dd className="font-bold text-gray-900">{booking.vehicle.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">{dict.successPage?.class || 'Class'}</dt>
                  <dd className="font-bold text-gray-900 capitalize">{booking.vehicle.category}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-4">
              <Calendar size={16} /> {dict.successPage?.tripItinerary || 'Trip Itinerary'}
            </h3>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 print:bg-transparent print:border print:p-4">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-blue-800">{dict.successPage?.pickupDate || 'Pick-up Date'}</dt>
                  <dd className="font-bold text-blue-900">{new Date(booking.startDate).toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-blue-800">{dict.successPage?.dropoffDate || 'Drop-off Date'}</dt>
                  <dd className="font-bold text-blue-900">{new Date(booking.endDate).toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-blue-200">
                  <dt className="text-blue-800 flex items-center gap-1"><MapPin size={14}/> {dict.successPage?.location || 'Location'}</dt>
                  <dd className="font-bold text-blue-900">Athens Airport</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-4">
            <FileText size={16} /> {dict.successPage?.financialBreakdown || 'Financial Breakdown'}
          </h3>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 print:bg-gray-200">
              <tr>
                <th className="py-3 px-4 font-bold rounded-l-lg">{dict.successPage?.description || 'Description'}</th>
                <th className="py-3 px-4 font-bold text-right">{dict.successPage?.rate || 'Rate'}</th>
                <th className="py-3 px-4 font-bold text-right rounded-r-lg">{dict.successPage?.amount || 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-4 px-4 text-gray-900 font-medium">{booking.vehicle.name} Rental ({days} days)</td>
                <td className="py-4 px-4 text-right text-gray-500">€{booking.vehicle.basePrice} / day</td>
                <td className="py-4 px-4 text-right font-medium text-gray-900">€{(booking.vehicle.basePrice * days).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-900 font-medium">Taxes & Fees (Included)</td>
                <td className="py-4 px-4 text-right text-gray-500">-</td>
                <td className="py-4 px-4 text-right font-medium text-gray-900">€0.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="py-5 px-4 text-right font-bold text-lg">{dict.successPage?.totalPaid || 'Total Paid'}</td>
                <td className="py-5 px-4 text-right font-black text-2xl text-blue-600 border-t-2 border-gray-900">€{booking.totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer info for print */}
        <div className="text-center text-xs text-gray-400 mt-16 pt-8 border-t hidden print:block">
          Island Drive Rentals | VAT: EL123456789 | Athens Airport, Greece | support@islanddrive.gr
        </div>
      </div>
      
      {/* Actions (Hidden in Print) */}
      <div className="mt-8 flex gap-4 print:hidden max-w-3xl w-full justify-end">
        <PrintButton />
        <Link 
          href={`/${lang}/fleet`}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition"
        >
          {dict.successPage?.bookAnother || 'Book Another Vehicle'}
        </Link>
      </div>
    </div>
  )
}
