import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { Settings, Sparkles, Calendar, Percent, Tag, Shield, Baby, Users } from "lucide-react"
import { revalidatePath } from "next/cache"

async function updateSettings(formData: FormData) {
  "use server"
  
  await prisma.globalSettings.upsert({
    where: { id: "global" },
    update: {
      highSeasonStartMonth: parseInt(formData.get("highSeasonStartMonth") as string),
      highSeasonEndMonth: parseInt(formData.get("highSeasonEndMonth") as string),
      surgePercentage: parseFloat(formData.get("surgePercentage") as string),
      weeklyDiscountPercent: parseFloat(formData.get("weeklyDiscountPercent") as string),
      commissionPercent: parseFloat(formData.get("commissionPercent") as string),
    },
    create: {
      id: "global",
      highSeasonStartMonth: parseInt(formData.get("highSeasonStartMonth") as string),
      highSeasonEndMonth: parseInt(formData.get("highSeasonEndMonth") as string),
      surgePercentage: parseFloat(formData.get("surgePercentage") as string),
      weeklyDiscountPercent: parseFloat(formData.get("weeklyDiscountPercent") as string),
      commissionPercent: parseFloat(formData.get("commissionPercent") as string),
    },
  })

  revalidatePath("/admin/pricing")
}

async function updateExtra(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const price = parseFloat(formData.get("price") as string)

  await prisma.extra.update({
    where: { id },
    data: { price },
  })

  revalidatePath("/admin/pricing")
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const EXTRA_ICONS: Record<string, any> = {
  "Full Protection Insurance": Shield,
  "Child Seat": Baby,
  "Additional Driver": Users,
}

export default async function AdminPricingPage() {
  const t = await getTranslations('admin.pricing')

  const [settings, extras] = await Promise.all([
    prisma.globalSettings.findFirst({ where: { id: "global" } }),
    prisma.extra.findMany(),
  ])

  const s = settings || {
    highSeasonStartMonth: 7,
    highSeasonEndMonth: 8,
    surgePercentage: 20,
    weeklyDiscountPercent: 10,
    commissionPercent: 15,
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">{t('title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      {/* Global Pricing Rules */}
      <div className="bg-[#1a1d27] rounded-2xl border border-white/5 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Settings className="text-white" size={18} />
          </div>
          <h3 className="text-lg font-bold text-white">{t('globalRules')}</h3>
        </div>

        <form action={updateSettings} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* High Season Start */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-blue-400" />
                {t('highSeason')} — Start {t('highSeasonMonths')}
              </label>
              <select
                name="highSeasonStartMonth"
                defaultValue={s.highSeasonStartMonth}
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl p-3 text-white font-medium outline-none focus:border-blue-500 transition-colors"
              >
                {MONTH_NAMES.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>

            {/* High Season End */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-blue-400" />
                {t('highSeason')} — End {t('highSeasonMonths')}
              </label>
              <select
                name="highSeasonEndMonth"
                defaultValue={s.highSeasonEndMonth}
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl p-3 text-white font-medium outline-none focus:border-blue-500 transition-colors"
              >
                {MONTH_NAMES.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>

            {/* Surge Percentage */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Percent size={14} className="text-yellow-400" />
                {t('surgePercent')}
              </label>
              <div className="relative">
                <input
                  name="surgePercentage"
                  type="number"
                  step="0.5"
                  min="0"
                  max="100"
                  defaultValue={s.surgePercentage}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl p-3 text-white font-medium outline-none focus:border-yellow-500 transition-colors pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
              </div>
            </div>

            {/* Weekly Discount */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Tag size={14} className="text-green-400" />
                {t('weeklyDiscount')}
              </label>
              <div className="relative">
                <input
                  name="weeklyDiscountPercent"
                  type="number"
                  step="0.5"
                  min="0"
                  max="100"
                  defaultValue={s.weeklyDiscountPercent}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl p-3 text-white font-medium outline-none focus:border-green-500 transition-colors pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
              </div>
            </div>

            {/* Commission Rate */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Percent size={14} className="text-purple-400" />
                {t('commissionRate')}
              </label>
              <div className="relative max-w-sm">
                <input
                  name="commissionPercent"
                  type="number"
                  step="0.5"
                  min="0"
                  max="100"
                  defaultValue={s.commissionPercent}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl p-3 text-white font-medium outline-none focus:border-purple-500 transition-colors pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              {t('saveChanges')}
            </button>
          </div>
        </form>
      </div>

      {/* Extras Management */}
      <div className="bg-[#1a1d27] rounded-2xl border border-white/5 p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Sparkles className="text-white" size={18} />
          </div>
          <h3 className="text-lg font-bold text-white">{t('extrasTitle')}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-[52px]">{t('extrasSubtitle')}</p>

        <div className="space-y-4">
          {extras.map((extra) => {
            const Icon = EXTRA_ICONS[extra.name] || Shield
            return (
              <form key={extra.id} action={updateExtra} className="bg-[#0f1117] border border-white/5 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 hover:border-white/10 transition-all">
                <input type="hidden" name="id" value={extra.id} />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Icon className="text-[var(--color-primary)]" size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm">{extra.name}</span>
                    <span className="block text-xs text-gray-500 capitalize">{extra.priceType === 'per_day' ? t('perDay') : t('perBooking')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">€</span>
                    <input
                      name="price"
                      type="number"
                      step="0.5"
                      min="0"
                      defaultValue={extra.price}
                      className="w-28 bg-[#1a1d27] border border-white/10 rounded-lg pl-7 pr-3 py-2.5 text-white font-medium outline-none focus:border-[var(--color-primary)] transition-colors text-sm"
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{t('perDay')}</span>
                  <button
                    type="submit"
                    className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              </form>
            )
          })}

          {extras.length === 0 && (
            <div className="text-center text-gray-600 py-12 text-sm">
              No extras configured yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
