import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateVehicle } from "@/app/[lang]/actions/fleet"
import Link from "next/link"

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const vehicle = await prisma.vehicle.findUnique({
    where: { id }
  })

  if (!vehicle) {
    notFound()
  }

  const images = JSON.parse(vehicle.images)
  const mainImage = images[0] || ""
  const specs = JSON.parse(vehicle.specs)

  const updateAction = updateVehicle.bind(null, vehicle.id)

  return (
    <div className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Edit Vehicle</h2>
        <Link href="/admin/fleet" className="text-sm text-gray-500 hover:underline">Cancel</Link>
      </div>

      <form action={updateAction} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input required name="name" defaultValue={vehicle.name} className="w-full border rounded-lg p-2" placeholder="e.g. Toyota Yaris" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select name="type" defaultValue={vehicle.type} className="w-full border rounded-lg p-2 bg-white">
              <option value="car">Car</option>
              <option value="scooter">Scooter</option>
              <option value="atv">ATV</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <input required name="category" defaultValue={vehicle.category} className="w-full border rounded-lg p-2" placeholder="e.g. Economy" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Base Price (€/day)</label>
            <input required name="basePrice" defaultValue={vehicle.basePrice} type="number" step="0.01" className="w-full border rounded-lg p-2" placeholder="35.00" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea required name="description" defaultValue={vehicle.description} className="w-full border rounded-lg p-2" rows={3} placeholder="Vehicle details..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <input required name="image" defaultValue={mainImage} className="w-full border rounded-lg p-2" placeholder="https://..." />
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Transmission</label>
              <select name="transmission" defaultValue={specs.transmission} className="w-full border rounded-lg p-2 bg-white">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel</label>
              <select name="fuel" defaultValue={specs.fuel} className="w-full border rounded-lg p-2 bg-white">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Seats</label>
              <input name="seats" defaultValue={specs.seats || 4} type="number" className="w-full border rounded-lg p-2" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  )
}
