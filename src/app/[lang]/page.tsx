import Link from "next/link";
import { Search, Star, Shield, Clock, Headphones } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations();
  const featuredVehicles = await prisma.vehicle.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { basePrice: 'asc' }
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[680px] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-gray-900" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        </div>
        
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center text-white space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-lg leading-[0.95]">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white section-spacing border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-3">
            <div className="bg-[var(--color-primary-light)] w-14 h-14 mx-auto rounded-xl flex items-center justify-center">
              <Star className="text-[var(--color-primary)]" size={24} />
            </div>
            <h3 className="font-bold text-sm">{t('features.topRated')}</h3>
            <p className="text-xs text-gray-500">{t('features.topRatedDesc')}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-[var(--color-primary-light)] w-14 h-14 mx-auto rounded-xl flex items-center justify-center">
              <Shield className="text-[var(--color-primary)]" size={24} />
            </div>
            <h3 className="font-bold text-sm">{t('features.noHidden')}</h3>
            <p className="text-xs text-gray-500">{t('features.noHiddenDesc')}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-[var(--color-primary-light)] w-14 h-14 mx-auto rounded-xl flex items-center justify-center">
              <Clock className="text-[var(--color-primary)]" size={24} />
            </div>
            <h3 className="font-bold text-sm">{t('features.freeCancel')}</h3>
            <p className="text-xs text-gray-500">{t('features.freeCancelDesc')}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-[var(--color-primary-light)] w-14 h-14 mx-auto rounded-xl flex items-center justify-center">
              <Headphones className="text-[var(--color-primary)]" size={24} />
            </div>
            <h3 className="font-bold text-sm">{t('features.support')}</h3>
            <p className="text-xs text-gray-500">{t('features.supportDesc')}</p>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="section-spacing bg-[var(--color-surface-alt)] flex-1">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div>
            <p className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3">{t('features.ourFleet')}</p>
            <h2 className="text-4xl font-extrabold tracking-tighter">{t('features.premiumVehicles')}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle: any) => {
              const images = JSON.parse(vehicle.images)
              const mainImg = images[0] || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80'
              const specs = JSON.parse(vehicle.specs)

              return (
                <div key={vehicle.id} className="card-premium overflow-hidden flex flex-col text-left group">
                  <div className="h-52 bg-gray-200 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${mainImg})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{vehicle.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{vehicle.category} {vehicle.type}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-[var(--color-primary)]">€{vehicle.basePrice}</span>
                        <span className="text-xs text-gray-400 block">{t('fleetPage.perDay')}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 font-medium mt-4 mb-6 uppercase tracking-wide">
                      {specs.seats && <span>{specs.seats} {t('fleetPage.seats')}</span>}
                      {specs.seats && specs.transmission && <span className="text-gray-300">•</span>}
                      {specs.transmission && <span>{specs.transmission}</span>}
                      {specs.fuel && <span className="text-gray-300">•</span>}
                      {specs.fuel && <span>{specs.fuel}</span>}
                    </div>
                    <div className="mt-auto">
                      <Link href={`/${lang}/fleet/${vehicle.slug}`} className="btn-primary w-full text-center text-sm !py-3">
                        {t('fleetPage.viewDetails')}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="pt-4">
            <Link href={`/${lang}/fleet`} className="btn-secondary">
              {t('hero.viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
