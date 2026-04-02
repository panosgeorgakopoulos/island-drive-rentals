import { prisma } from "@/lib/prisma"
import { CheckCircle, Clock, XCircle, FileSpreadsheet, Trash2 } from "lucide-react"
import { cancelBookingAction, deleteBookingAction } from "@/app/[lang]/actions/booking"

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { user: true, vehicle: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bookings Management</h2>
          <p className="text-sm text-gray-500">View and manage all customer reservations.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border">
          <FileSpreadsheet size={16} className="text-green-600" />
          <span>Google Sheets Sync: <strong className="text-green-600">Active</strong></span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-sm text-gray-500 uppercase">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Dates</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Total Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{b.user.name || "N/A"}</div>
                  <div className="text-xs text-gray-500">{b.user.email}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{b.vehicle.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{b.vehicle.type}</div>
                </td>
                <td className="p-4">
                  <div>{b.startDate.toLocaleDateString()} &rarr; {b.endDate.toLocaleDateString()}</div>
                </td>
                <td className="p-4 text-gray-600">
                  {b.pickupLocation}
                </td>
                <td className="p-4 font-bold text-gray-900">
                  €{b.totalPrice}
                </td>
                <td className="p-4">
                  {b.status === "confirmed" && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle size={12} /> Confirmed
                    </span>
                  )}
                  {b.status === "pending" && (
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      <Clock size={12} /> Pending Payment
                    </span>
                  )}
                  {b.status === "cancelled" && (
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      <XCircle size={12} /> Cancelled
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {b.status === "confirmed" && (
                      <form action={cancelBookingAction.bind(null, b.id)}>
                        <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                          Cancel
                        </button>
                      </form>
                    )}
                    {(b.status === "pending" || b.status === "cancelled") && (
                      <form action={deleteBookingAction.bind(null, b.id)}>
                        <button type="submit" className="text-xs font-medium text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                          <Trash2 size={12} /> Delete
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
