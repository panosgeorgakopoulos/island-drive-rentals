import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { Users, TrendingUp, MapPin } from "lucide-react"

export default async function AdminCustomersPage() {
  const t = await getTranslations('admin.customers')

  // Fetch all non-admin users with their bookings
  const users = await prisma.user.findMany({
    where: { role: { not: "admin" } },
    include: {
      bookings: {
        select: {
          totalPrice: true,
          pickupLocation: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Calculate stats
  const customersWithStats = users.map(user => ({
    id: user.id,
    name: user.name || 'N/A',
    email: user.email || 'N/A',
    joined: user.createdAt,
    totalBookings: user.bookings.length,
    ltv: user.bookings.reduce((sum, b) => sum + b.totalPrice, 0),
  })).sort((a, b) => b.ltv - a.ltv)

  const totalCustomers = customersWithStats.length
  const totalLtv = customersWithStats.reduce((sum, c) => sum + c.ltv, 0)
  const avgLtv = totalCustomers > 0 ? totalLtv / totalCustomers : 0

  // Most popular island
  const locationCounts: Record<string, number> = {}
  users.forEach(u => {
    u.bookings.forEach(b => {
      const loc = b.pickupLocation.toLowerCase()
      const islands = ['santorini', 'mykonos', 'crete', 'paros', 'rhodes']
      for (const island of islands) {
        if (loc.includes(island)) {
          locationCounts[island] = (locationCounts[island] || 0) + 1
          break
        }
      }
    })
  })
  const topIsland = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

  const summaryCards = [
    {
      label: t('totalCustomers'),
      value: totalCustomers.toString(),
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      label: t('averageLtv'),
      value: `€${avgLtv.toFixed(2)}`,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
    },
    {
      label: t('topIsland'),
      value: topIsland.charAt(0).toUpperCase() + topIsland.slice(1),
      icon: MapPin,
      gradient: 'from-[var(--color-primary)] to-orange-600',
      shadow: 'shadow-orange-500/20',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">{t('title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {summaryCards.map((card, i) => (
          <div key={i} className="bg-[#1a1d27] rounded-2xl border border-white/5 p-6 flex flex-col relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
              <card.icon className="w-full h-full" />
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg ${card.shadow}`}>
              <card.icon className="text-white" size={18} />
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</span>
            <span className="text-3xl font-extrabold text-white mt-1 tracking-tight">{card.value}</span>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-[#1a1d27] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
              <th className="p-5 font-medium">{t('name')}</th>
              <th className="p-5 font-medium">{t('email')}</th>
              <th className="p-5 font-medium text-center">{t('totalBookings')}</th>
              <th className="p-5 font-medium text-right">{t('ltv')}</th>
              <th className="p-5 font-medium text-right">{t('joined')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {customersWithStats.map((customer, i) => (
              <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-xs">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-white">{customer.name}</span>
                  </div>
                </td>
                <td className="p-5 text-gray-400">{customer.email}</td>
                <td className="p-5 text-center">
                  <span className={`inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-full text-xs font-bold ${
                    customer.totalBookings > 0 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'bg-white/5 text-gray-500'
                  }`}>
                    {customer.totalBookings}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <span className={`font-bold ${customer.ltv > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
                    €{customer.ltv.toFixed(2)}
                  </span>
                </td>
                <td className="p-5 text-right text-gray-500 text-xs">
                  {customer.joined.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {customersWithStats.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-gray-600">
                  {t('noCustomers')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
