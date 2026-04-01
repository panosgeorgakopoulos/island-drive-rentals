import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import { cancelMyBooking } from "@/app/actions/booking"

export default async function ProfilePage() {
  const session = await auth()
  
  if (!session || !session.user || !session.user.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    redirect("/login")
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { vehicle: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight mb-2">My Profile</h2>
          <p className="text-gray-600 mb-6">Manage your account and view your reservations.</p>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <div className="font-medium">{user.name || "N/A"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="font-medium">{user.email}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold tracking-tight mb-6">My Bookings</h3>
          
          <div className="space-y-4">
            {bookings.map((b: any) => (
              <div key={b.id} className="border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-gray-50 transition">
                <div 
                  className="w-full md:w-48 h-32 bg-gray-200 rounded-lg bg-cover bg-center shrink-0" 
                  style={{ backgroundImage: `url(${JSON.parse(b.vehicle.images)[0]})` }} 
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{b.vehicle.name}</h4>
                    {b.status === "confirmed" && (
                      <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <CheckCircle size={14} /> Confirmed
                      </span>
                    )}
                    {b.status === "pending" && (
                      <span className="flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                    {b.status === "cancelled" && (
                      <span className="flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        <XCircle size={14} /> Cancelled
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar size={16} />
                    {b.startDate.toLocaleDateString("en-GB")} &rarr; {b.endDate.toLocaleDateString("en-GB")}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Pickup:</strong> {b.pickupLocation}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 border-t pt-4">
                    <div className="font-extrabold text-[var(--color-primary)] text-lg">
                      €{b.totalPrice}
                    </div>
                    
                    {b.status === "confirmed" && ((b.startDate.getTime() - Date.now()) / (1000 * 60 * 60)) > 48 && (
                      <form action={cancelMyBooking.bind(null, b.id)}>
                        <button type="submit" className="text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition border border-red-100">
                          Cancel Booking
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {bookings.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-500 mb-4">You have no bookings yet.</p>
                <a href="/fleet" className="text-blue-600 font-medium hover:underline">Explore our fleet</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
