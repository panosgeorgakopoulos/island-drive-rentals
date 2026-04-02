import { prisma } from "@/lib/prisma"
import { DollarSign, CalendarDays, Percent, Car } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { ISLANDS } from "@/config/locations"

export default async function AdminDashboardPage() {
  const t = await getTranslations('admin.dashboard')
  const tLoc = await getTranslations('locations')

  // Fetch real stats — only count confirmed/paid bookings
  const [bookings, vehicles, globalSettings] = await Promise.all([
    prisma.booking.findMany({
      where: { status: { in: ["confirmed", "paid"] } },
      select: { totalPrice: true, pickupLocation: true, createdAt: true, startDate: true, endDate: true, vehicleId: true }
    }),
    prisma.vehicle.findMany({ where: { isActive: true } }),
    (prisma as any).globalSetting.findMany(),
  ])

  // Build settings lookup from key-value pairs
  const settingsMap: Record<string, string> = (globalSettings as any[]).reduce((acc: Record<string, string>, s: any) => ({ ...acc, [s.key]: s.value }), {})

  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + b.totalPrice, 0)
  const totalBookings = bookings.length
  const commissionRate = parseFloat(settingsMap['commissionPercent'] || '15')
  const commissions = totalRevenue * (commissionRate / 100)

  // Fleet utilization: vehicles that have an active/current booking
  const now = new Date()
  const rentedNow = new Set(
    bookings
      .filter((b: any) => b.startDate <= now && b.endDate >= now)
      .map((b: any) => b.vehicleId)
  ).size
  const totalVehicles = vehicles.length
  const utilizationPct = totalVehicles > 0 ? Math.round((rentedNow / totalVehicles) * 100) : 0

  // Revenue over time (last 6 months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const revenueByMonth: { month: string; revenue: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const month = d.getMonth()
    const year = d.getFullYear()
    const monthRevenue = bookings
      .filter((b: any) => b.createdAt.getMonth() === month && b.createdAt.getFullYear() === year)
      .reduce((sum: number, b: any) => sum + b.totalPrice, 0)
    revenueByMonth.push({ month: monthNames[month], revenue: monthRevenue })
  }
  const maxRevenue = Math.max(...revenueByMonth.map(m => m.revenue), 1)

  // Bookings per island
  const islandBookings: { id: string; name: string; count: number }[] = ISLANDS.map(island => ({
    id: island.id,
    name: island.name,
    count: bookings.filter((b: any) => {
      const loc = b.pickupLocation.toLowerCase()
      return loc.includes(island.id.toLowerCase()) || island.points?.some((p: string) => loc.includes(p.toLowerCase().split(' ')[0]))
    }).length
  }))
  const maxIslandBookings = Math.max(...islandBookings.map(i => i.count), 1)

  const statCards = [
    {
      label: t('totalRevenue'),
      value: `€${totalRevenue.toLocaleString('en', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
    },
    {
      label: t('totalBookings'),
      value: totalBookings.toString(),
      icon: CalendarDays,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      label: t('commissions'),
      value: `€${commissions.toLocaleString('en', { minimumFractionDigits: 2 })}`,
      icon: Percent,
      gradient: 'from-purple-500 to-violet-600',
      shadow: 'shadow-purple-500/20',
    },
    {
      label: t('fleetUtilization'),
      value: `${utilizationPct}%`,
      subtitle: `${rentedNow} ${t('rented')} / ${totalVehicles}`,
      icon: Car,
      gradient: 'from-[var(--color-primary)] to-orange-600',
      shadow: 'shadow-orange-500/20',
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-white">{t('title')}</h2>
      
      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-[#1a1d27] rounded-2xl border border-white/5 p-6 flex flex-col relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              <card.icon className="w-full h-full" />
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg ${card.shadow}`}>
              <card.icon className="text-white" size={18} />
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</span>
            <span className="text-3xl font-extrabold text-white mt-1 tracking-tight">{card.value}</span>
            {card.subtitle && (
              <span className="text-xs text-gray-500 mt-1">{card.subtitle}</span>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Over Time — Bar Chart */}
        <div className="bg-[#1a1d27] rounded-2xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-lg">{t('revenueOverTime')}</h3>
            <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">{t('last6Months')}</span>
          </div>
          {totalBookings > 0 ? (
            <div className="flex items-end gap-3 h-48">
              {revenueByMonth.map((m, i) => {
                const height = maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-medium">
                      {m.revenue > 0 ? `€${Math.round(m.revenue)}` : ''}
                    </span>
                    <div className="w-full relative" style={{ height: '160px' }}>
                      <div
                        className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-[var(--color-primary)] to-orange-400 transition-all duration-500"
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">{m.month}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-600 text-sm">{t('noData')}</div>
          )}
        </div>

        {/* Bookings Per Island — Horizontal Bar Chart */}
        <div className="bg-[#1a1d27] rounded-2xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-lg">{t('bookingsPerIsland')}</h3>
          </div>
          {totalBookings > 0 ? (
            <div className="space-y-4">
              {islandBookings.map((island) => {
                const widthPct = maxIslandBookings > 0 ? (island.count / maxIslandBookings) * 100 : 0
                return (
                  <div key={island.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{tLoc(island.id as any)}</span>
                      <span className="text-sm font-bold text-white">{island.count}</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-orange-400 transition-all duration-700"
                        style={{ width: `${Math.max(widthPct, 2)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-600 text-sm">{t('noData')}</div>
          )}
        </div>
      </div>
    </div>
  );
}
