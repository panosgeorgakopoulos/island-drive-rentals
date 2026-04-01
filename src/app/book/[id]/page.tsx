import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Booking Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Complete your booking</h2>
            
            <form action="/api/checkout" method="POST" className="space-y-6">
              <input type="hidden" name="vehicleId" value={vehicle.id} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Date</label>
                  <input required name="startDate" type="date" className="w-full border rounded-lg p-3 bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Return Date</label>
                  <input required name="endDate" type="date" className="w-full border rounded-lg p-3 bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pickup Location</label>
                <select name="pickupLocation" className="w-full border rounded-lg p-3 bg-gray-50">
                  <option value="Athens Airport">Athens Airport</option>
                  <option value="City Center">City Center</option>
                </select>
              </div>

              <div className="pt-6 border-t font-medium text-lg">Customer Information</div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input required name="name" defaultValue={session.user?.name || ""} className="w-full border rounded-lg p-3 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input required name="email" type="email" readOnly defaultValue={session.user?.email || ""} className="w-full border rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition mt-8 shadow-lg shadow-blue-600/20">
                Proceed to Payment (Stripe)
              </button>
            </form>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
            <div className="flex gap-4 items-center mb-6 pb-6 border-b">
              <div 
                className="w-20 h-20 bg-gray-200 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${JSON.parse(vehicle.images)[0]})` }}
              />
              <div>
                <h4 className="font-bold text-gray-900">{vehicle.name}</h4>
                <p className="text-sm text-gray-500 capitalize">{vehicle.category} {vehicle.type}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Daily Rate</span>
                <span className="font-medium text-gray-900">€{vehicle.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium text-gray-900">Pending dates</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-blue-600">Calculated at checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
