import Link from "next/link"
import { CheckCircle, Calendar, MapPin, Car } from "lucide-react"

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; mock?: string }
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-2xl p-8 border shadow-lg text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for choosing Island Drive Rentals. We have sent a confirmation email to you.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-xl text-left space-y-4 mb-8">
           <h3 className="font-bold text-gray-900 border-b pb-2">Next Steps</h3>
           <ul className="text-sm text-gray-600 space-y-3">
             <li className="flex items-start gap-3">
               <Calendar className="text-blue-600 shrink-0 mt-0.5" size={16} />
               <span>Mark your calendar for the pick-up date. Don't forget your driver's license.</span>
             </li>
             <li className="flex items-start gap-3">
               <MapPin className="text-blue-600 shrink-0 mt-0.5" size={16} />
               <span>Meet our representative at the selected location on time.</span>
             </li>
             <li className="flex items-start gap-3">
               <Car className="text-blue-600 shrink-0 mt-0.5" size={16} />
               <span>Check the vehicle, sign the rental agreement and you're good to go!</span>
             </li>
           </ul>
        </div>
        
        <div className="space-y-3">
          <Link href="/profile" className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
            View My Bookings
          </Link>
          <Link href="/" className="block w-full text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
