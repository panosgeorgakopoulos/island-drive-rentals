import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { Settings, Sparkles, Percent, Tag, Shield, Baby, Users, ArrowUpRight } from "lucide-react"

const EXTRA_ICONS: Record<string, any> = {
  "Full Insurance": Shield,
  "Child Seat": Baby,
  "Additional Driver": Users,
}

export default async function AdminPricingPage() {
  const t = await getTranslations('admin')

  const [settings, extras] = await Promise.all([
    (prisma as any).globalSetting.findMany(),
    prisma.extra.findMany(),
  ])

  // Convert array to record for easier lookup with fallback defaults
  const s = settings.reduce((acc: Record<string, string>, curr: any) => ({ ...acc, [curr.key]: curr.value }), {
    surgePercentage: "20",
    weeklyDiscount: "10"
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">{t('pricing.title')}</h2>
          <p className="text-gray-500 mt-1">{t('pricing.subtitle')}</p>
        </div>
        <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" /> Read Only Mode
        </div>
      </div>

      {/* Global Rules Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1d27] rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
              <Percent className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('pricing.surgePercent')}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('pricing.highSeason')}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter">+{s['surgePercentage']}%</span>
          </div>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed font-medium">
            Automatic rate increase applied during peak travel months (July - August).
          </p>
        </div>

        <div className="bg-[#1a1d27] rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Tag className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('pricing.weeklyDiscount')}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Long-term Stay</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter">-{s['weeklyDiscount']}%</span>
          </div>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed font-medium">
            Reduction applied automatically to any booking exceeding 7 consecutive days.
          </p>
        </div>
      </div>

      {/* Extras Management Section */}
      <div className="bg-[#1a1d27] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/20">
              <Sparkles className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('pricing.extrasTitle')}</h3>
              <p className="text-sm text-gray-500 font-medium">{t('pricing.extrasSubtitle')}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {extras.map((extra: any) => {
            const Icon = EXTRA_ICONS[extra.name] || Shield
            return (
              <div key={extra.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-gray-400" size={18} />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{extra.name}</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">
                      {extra.priceType === 'per_day' ? t('pricing.perDay') : t('pricing.perBooking')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-2xl font-black text-white leading-none">€{extra.price}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fixed Daily Rate</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-600 group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
