import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Calendar, CheckCircle, Clock } from "lucide-react"

export default async function ProfilePage() {
  const session = await auth()
  
  if (!session || !session.user || !session.user.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      bookings: {
        include: { vehicle: true },
        orderBy: { createdAt: "desc" }
      }
    }
  })

  if (!user) {
    redirect("/login")
  }

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
            {user.bookings.map((b) => (
              <div key={b.id} className="border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-gray-50 transition">
                <div 
                  className="w-full md:w-48 h-32 bg-gray-200 rounded-lg bg-cover bg-center shrink-0" 
                  style={{ backgroundImage: `url(${JSON.parse(b.vehicle.images)[0]})` }} 
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{b.vehicle.name}</h4>
                    {b.status === "confirmed" && (
                      <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        <CheckCircle size={14} /> Confirmed
                      </span>
                    )}
                    {b.status === "pending" && (
                      <span className="flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar size={16} />
                    {b.startDate.toLocaleDateString()} &rarr; {b.endDate.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Pickup:</strong> {b.pickupLocation}
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-2">
                    Total: €{b.totalPrice}
                  </div>
                </div>
              </div>
            ))}

            {user.bookings.length === 0 && (
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
