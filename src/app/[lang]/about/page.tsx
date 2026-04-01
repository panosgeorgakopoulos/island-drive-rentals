import Link from "next/link"
import { Shield, Clock, Map, Star, ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function AboutPage() {
  const t = await getTranslations('aboutPage');
  
  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 object-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000")'}} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-alt)] to-transparent" />
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-48 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            {t('mission')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
        <div className="card-premium p-10 md:p-16 mb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{t('section1Title')}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('section1Desc1')}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('section1Desc2')}
              </p>
              <Link href="/fleet" className="inline-flex items-center gap-2 font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition group">
                {t('browseFleet')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600" className="rounded-2xl shadow-md w-full h-48 object-cover" alt="Luxury car interior" />
               <img src="https://images.unsplash.com/photo-1581534089903-82a15f0113dd?auto=format&fit=crop&w=600" className="rounded-2xl shadow-md w-full h-48 object-cover mt-8" alt="Greek island road" />
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">{t('whyChooseUs')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t('whyChooseUsDesc')}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Shield className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t('noHiddenFees')}</h3>
            <p className="text-gray-500 text-sm">{t('noHiddenFeesDesc')}</p>
          </div>
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Clock className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t('roadside')}</h3>
            <p className="text-gray-500 text-sm">{t('roadsideDesc')}</p>
          </div>
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Star className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t('newModels')}</h3>
            <p className="text-gray-500 text-sm">{t('newModelsDesc')}</p>
          </div>
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Map className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t('vipDelivery')}</h3>
            <p className="text-gray-500 text-sm">{t('vipDeliveryDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
