import Link from "next/link"
import { MapPin, Plane, ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { ISLANDS } from "@/config/locations"

export default async function LocationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations('locationsPage');
  const tLoc = await getTranslations('locations');

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gray-900 border-b relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000")'}} />
        <div className="max-w-6xl mx-auto px-6 section-spacing relative z-10 text-white">
          <p className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3">{t('explore')}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('title')}</h1>
          <p className="text-lg text-gray-300 mt-4 max-w-xl text-balance">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 gap-10">
          {ISLANDS.map(loc => (
            <div key={loc.id} className="card-premium p-8 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight mb-1">{tLoc(loc.id as any)}</h3>
                  <p className="text-[var(--color-primary)] font-bold text-sm tracking-widest uppercase">{loc.id}</p>
                </div>
                <div className="bg-[var(--color-primary-light)] p-3 rounded-2xl text-[var(--color-primary)]">
                  <MapPin size={24} />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Plane size={14} /> {t('airports')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {loc.points.map(point => (
                    <span key={point} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-600">
                      {tLoc(point as any)}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                href={`/${lang}/fleet?location=${loc.id}`}
                className="btn-primary w-full flex items-center justify-center gap-2 group-hover:shadow-lg transition-all"
              >
                {t('searchVehicles')} <ChevronRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
