import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

export default async function FleetPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { basePrice: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Fleet Management</h2>
        <Link 
          href="/admin/fleet/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Vehicle
        </Link>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-sm text-gray-500 uppercase">
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Base Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{v.name}</td>
                <td className="p-4 text-gray-600 capitalize">{v.type}</td>
                <td className="p-4 text-gray-600 capitalize">{v.category}</td>
                <td className="p-4 font-medium">€{v.basePrice}/day</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {v.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/fleet/${v.id}/edit`} className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                      <Edit size={18} />
                    </Link>
                    <button className="text-red-600 hover:bg-red-50 p-2 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No vehicles found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
