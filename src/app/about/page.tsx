import Link from "next/link"
import { Shield, Clock, Map, Star, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 object-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000")'}} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-alt)] to-transparent" />
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-48 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">Redefining Island Travel</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Founded in 2026, Island Drive Rentals brings uncompromising luxury, safety, and transparency to the Greek rental market.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
        <div className="card-premium p-10 md:p-16 mb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Our Fleet, Your Freedom</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We believe that the journey should be as remarkable as the destination. Say goodbye to hidden mileage fees, outdated models, and confusing contracts.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Every vehicle in the Island Drive fleet is maintained to the highest manufacturer standards and refreshed every season. From nimble scooters for Cycladic alleyways to premium SUVs for mountainous ascents, your perfect ride awaits.
              </p>
              <Link href="/fleet" className="inline-flex items-center gap-2 font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition group">
                Browse our fleet <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600" className="rounded-2xl shadow-md w-full h-48 object-cover" alt="Luxury car interior" />
               <img src="https://images.unsplash.com/photo-1581534089903-82a15f0113dd?auto=format&fit=crop&w=600" className="rounded-2xl shadow-md w-full h-48 object-cover mt-8" alt="Greek island road" />
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Experience the difference of a truly premium rental service tailored for modern travelers.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Shield className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">No Hidden Fees</h3>
            <p className="text-gray-500 text-sm">Transparent pricing from day one. Full coverage options available at checkout.</p>
          </div>
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Clock className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">24/7 Roadside</h3>
            <p className="text-gray-500 text-sm">Drive with peace of mind. Our support team is active around the clock across all islands.</p>
          </div>
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Star className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">New Models</h3>
            <p className="text-gray-500 text-sm">Our fleet consists strictly of late-model vehicles featuring the latest safety tech.</p>
          </div>
          <div className="card-premium p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6">
               <Map className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">VIP Airport Delivery</h3>
            <p className="text-gray-500 text-sm">Keys handed directly to you at arrivals. Skip the rental desk lines entirely.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
