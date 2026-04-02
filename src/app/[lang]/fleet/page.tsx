import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Users, Fuel, Car as CarIcon, Settings } from "lucide-react"
import { FleetFilters } from "@/components/FleetFilters"
import { getTranslations } from "next-intl/server"

export default async function PublicFleetPage({ 
  searchParams, params 
}: { 
  searchParams: Promise<{ start?: string, end?: string, category?: string, maxPrice?: string }>,
  params: Promise<{ lang: string }> 
}) {
  const { start, end, category, maxPrice } = await searchParams;
  const { lang } = await params;
  const t = await getTranslations('fleetPage');
  
  const where: any = { isActive: true }
  if (category) where.category = category
  if (maxPrice) where.basePrice = { lte: Number(maxPrice) }

  // --- SMART AVAILABILITY FILTER ---
  if (start && end) {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      where.bookings = {
        none: {
          AND: [
            { startDate: { lte: endDate } },    // Existing start is before or on requested end
            { endDate: { gte: startDate } },    // Existing end is after or on requested start
            { status: { in: ['confirmed', 'paid'] } }
          ]
        }
      }
    }
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { basePrice: 'asc' }
  })

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      <div className="bg-white border-b border-gray-100 section-spacing !pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3">{t('browse')}</p>
          <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900">{t('title')}</h1>
          <p className="text-lg text-gray-500 mt-2">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar: Filters (1/4 width) */}
        <div className="w-full md:w-1/4 shrink-0">
          <FleetFilters />
        </div>

        {/* Right Content: Vehicles Grid (3/4 width) */}
        <div className="w-full md:w-3/4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {vehicles.map((v: any) => {
            const images = JSON.parse(v.images)
            const mainImg = images[0] || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800'
            const specs = JSON.parse(v.specs)
            
            return (
              <div key={v.id} className="card-premium overflow-hidden flex flex-col group">
                <div 
                  className="h-56 bg-gray-200 bg-cover bg-center relative overflow-hidden" 
                  style={{ backgroundImage: `url(${mainImg})` }} 
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{v.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{v.category} {v.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-[var(--color-primary)]">€{v.basePrice}</span>
                      <span className="text-xs text-gray-400 block">{t('perDay')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 mt-6 mb-6 text-sm text-gray-500">
                    {specs.seats && (
                      <div className="flex items-center gap-2"><Users size={15}/> {specs.seats} {t('seats')}</div>
                    )}
                    {specs.transmission && (
                      <div className="flex items-center gap-2"><Settings size={15}/> {specs.transmission}</div>
                    )}
                    {specs.fuel && (
                      <div className="flex items-center gap-2"><Fuel size={15}/> {specs.fuel}</div>
                    )}
                    <div className="flex items-center gap-2"><CarIcon size={15}/> AC</div>
                  </div>

                  <div className="mt-auto">
                    <Link href={`/${lang}/fleet/${v.slug}${start && end ? `?start=${start}&end=${end}` : ''}`} className="btn-primary w-full text-center text-sm !py-3">
                      {t('viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
          {vehicles.length === 0 && (
             <div className="text-center py-20 card-premium mt-8">
               <CarIcon size={48} className="mx-auto text-gray-300 mb-4" />
               <h3 className="text-xl font-bold text-gray-700">{t('noVehicles')}</h3>
               <p className="text-gray-500">{t('checkBack')}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
