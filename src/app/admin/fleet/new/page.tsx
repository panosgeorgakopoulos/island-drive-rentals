import { createVehicle } from "@/app/actions/fleet"

export default function NewVehiclePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-2xl font-bold tracking-tight">Add New Vehicle</h2>
      
      <form action={createVehicle} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input required name="name" className="w-full border rounded-lg p-2" placeholder="e.g. Toyota Yaris" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select name="type" className="w-full border rounded-lg p-2 bg-white">
              <option value="car">Car</option>
              <option value="scooter">Scooter</option>
              <option value="atv">ATV</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <input required name="category" className="w-full border rounded-lg p-2" placeholder="e.g. Economy" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Base Price (€/day)</label>
            <input required name="basePrice" type="number" step="0.01" className="w-full border rounded-lg p-2" placeholder="35.00" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea required name="description" className="w-full border rounded-lg p-2" rows={3} placeholder="Vehicle details..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <input required name="image" className="w-full border rounded-lg p-2" placeholder="https://..." />
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Transmission</label>
              <select name="transmission" className="w-full border rounded-lg p-2 bg-white">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel</label>
              <select name="fuel" className="w-full border rounded-lg p-2 bg-white">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Seats</label>
              <input name="seats" type="number" defaultValue="4" className="w-full border rounded-lg p-2" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Save Vehicle
          </button>
        </div>
        
      </form>
    </div>
  )
}
