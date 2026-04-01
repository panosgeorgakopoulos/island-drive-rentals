import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Users, Fuel, Car as CarIcon, Settings } from "lucide-react"

export default async function PublicFleetPage({ searchParams }: { searchParams: Promise<{ start?: string, end?: string }> }) {
  const { start, end } = await searchParams;
  const vehicles = await prisma.vehicle.findMany({
    where: { isActive: true },
    orderBy: { basePrice: 'asc' }
  })

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Our Fleet</h1>
          <p className="text-lg text-gray-500 mt-2">Choose from our wide selection of premium vehicles.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((v: any) => {
            const images = JSON.parse(v.images)
            const mainImg = images[0] || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800'
            const specs = JSON.parse(v.specs)
            
            return (
              <div key={v.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border overflow-hidden flex flex-col">
                <div 
                  className="h-56 bg-gray-200 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${mainImg})` }} 
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{v.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{v.category} {v.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-blue-600">€{v.basePrice}</span>
                      <span className="text-xs text-gray-500 block">per day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 mt-6 mb-6 text-sm text-gray-600">
                    {specs.seats && (
                      <div className="flex items-center gap-2"><Users size={16}/> {specs.seats} Seats</div>
                    )}
                    {specs.transmission && (
                      <div className="flex items-center gap-2"><Settings size={16}/> {specs.transmission}</div>
                    )}
                    {specs.fuel && (
                      <div className="flex items-center gap-2"><Fuel size={16}/> {specs.fuel}</div>
                    )}
                    <div className="flex items-center gap-2"><CarIcon size={16}/> AC</div>
                  </div>

                  <div className="mt-auto">
                    <Link href={`/fleet/${v.slug}${start && end ? `?start=${start}&end=${end}` : ''}`} className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {vehicles.length === 0 && (
           <div className="text-center py-20 bg-white rounded-2xl border">
             <CarIcon size={48} className="mx-auto text-gray-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-700">No vehicles available</h3>
             <p className="text-gray-500">Check back soon for new additions to our fleet.</p>
           </div>
        )}
      </div>
    </div>
  )
}
