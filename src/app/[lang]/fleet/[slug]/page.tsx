import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Users, Fuel, Car as CarIcon, Settings, Calendar, MapPin, Check } from "lucide-react"
import { BookingSidebar } from "@/components/BookingSidebar"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug }
  })

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
      description: "The requested vehicle could not be found."
    }
  }

  const images = JSON.parse(vehicle.images)
  const mainImg = images[0] || ""

  return {
    title: vehicle.name,
    description: `Rent the ${vehicle.name} (${vehicle.category}) for just €${vehicle.basePrice}/day at Island Drive Rentals.`,
    openGraph: {
      images: [mainImg]
    }
  }
}

export default async function VehicleDetailsPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ start?: string, end?: string, location?: string }> }) {
  const { slug } = await params
  const { start, end, location } = await searchParams
  
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
    <div className="bg-gray-50 min-h-screen pb-36 md:pb-20">
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

        {/* Booking Sidebar */}
        <div className="space-y-6">
          <BookingSidebar vehicleId={vehicle.id} basePrice={vehicle.basePrice} initialStart={start} initialEnd={end} initialLocation={location} />
          
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-blue-900 flex items-center gap-2"><Check size={18} className="text-blue-600" /> Free Cancellation</h4>
            <p className="text-sm text-blue-800/80 mt-1">Cancel for free up to 48 hours before pick-up.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
