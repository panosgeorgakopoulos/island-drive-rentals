import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Users, Fuel, Car as CarIcon, Settings, Calendar, MapPin, Check } from "lucide-react"

export default async function VehicleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug }
  })

  if (!vehicle) {
    notFound()
  }

  const images = JSON.parse(vehicle.images)
  const mainImg = images[0] || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200'
  const specs = JSON.parse(vehicle.specs)

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/fleet" className="text-sm font-medium text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Fleet
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{vehicle.name}</h1>
              <p className="text-lg text-gray-500 capitalize">{vehicle.category} {vehicle.type}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-blue-600">€{vehicle.basePrice}</span>
              <span className="text-sm text-gray-500 block">per day</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div 
            className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-2xl bg-cover bg-center shadow-inner"
            style={{ backgroundImage: `url(${mainImg})` }}
          />

          <div className="bg-white rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight mb-4">About this vehicle</h2>
            <p className="text-gray-600 leading-relaxed">
              {vehicle.description}
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.seats && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Users size={24} className="mx-auto text-blue-600 mb-2" />
                  <span className="block font-medium text-gray-900">{specs.seats}</span>
                  <span className="text-xs text-gray-500">Seats</span>
                </div>
              )}
              {specs.transmission && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Settings size={24} className="mx-auto text-blue-600 mb-2" />
                  <span className="block font-medium text-gray-900">{specs.transmission}</span>
                  <span className="text-xs text-gray-500">Transmission</span>
                </div>
              )}
              {specs.fuel && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Fuel size={24} className="mx-auto text-blue-600 mb-2" />
                  <span className="block font-medium text-gray-900">{specs.fuel}</span>
                  <span className="text-xs text-gray-500">Fuel</span>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <CarIcon size={24} className="mx-auto text-blue-600 mb-2" />
                <span className="block font-medium text-gray-900">Included</span>
                <span className="text-xs text-gray-500">A/C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar placeholder */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border shadow-sm sticky top-24">
             <h3 className="text-xl font-bold mb-6 tracking-tight">Reserve your dates</h3>
             
             <div className="space-y-4">
                <div className="border rounded-xl p-3 flex flex-col">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2"><MapPin size={14}/> Location</label>
                  <select className="font-medium outline-none bg-transparent">
                    <option>Athens Airport</option>
                    <option>City Center</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-xl p-3 flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2"><Calendar size={14}/> Pick-up</label>
                    <input type="date" className="font-medium outline-none bg-transparent" />
                  </div>
                  <div className="border rounded-xl p-3 flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2"><Calendar size={14}/> Drop-off</label>
                    <input type="date" className="font-medium outline-none bg-transparent" />
                  </div>
                </div>
                
                <div className="pt-4 border-t mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">€{vehicle.basePrice} x 3 days</span>
                    <span className="font-medium text-gray-900">€{vehicle.basePrice * 3}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span className="text-blue-600">€{vehicle.basePrice * 3}</span>
                  </div>
                </div>

                <Link 
                  href={`/book/${vehicle.id}`} 
                  className="block w-full bg-blue-600 text-white text-center font-bold py-4 rounded-xl mt-6 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  Continue to Book
                </Link>
                <p className="text-xs text-center text-gray-500 mt-3">You won't be charged yet.</p>
             </div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-blue-900 flex items-center gap-2"><Check size={18} className="text-blue-600" /> Free Cancellation</h4>
            <p className="text-sm text-blue-800/80 mt-1">Cancel for free up to 48 hours before pick-up.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
