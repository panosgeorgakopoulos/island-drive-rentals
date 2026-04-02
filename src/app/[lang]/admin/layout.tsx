import Link from "next/link";
import { LayoutDashboard, Car, CalendarDays, Users, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations('admin');

  return (
    <div className="flex min-h-screen bg-[#0f1117]">
      {/* Premium Dark Sidebar */}
      <aside className="w-72 bg-[#151820] border-r border-white/5 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-orange-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">ID</span>
            </div>
            <span className="font-bold text-white text-sm tracking-tight">{t('sidebar.brand')}</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href={`/${lang}/admin`} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <LayoutDashboard size={18} />
            {t('sidebar.dashboard')}
          </Link>
          <Link href={`/${lang}/admin/fleet`} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <Car size={18} />
            {t('sidebar.fleet')}
          </Link>
          <Link href={`/${lang}/admin/bookings`} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <CalendarDays size={18} />
            {t('sidebar.bookings')}
          </Link>
          <Link href={`/${lang}/admin/pricing`} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <Tag size={18} />
            {t('sidebar.pricing')}
          </Link>
          <Link href={`/${lang}/admin/customers`} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <Users size={18} />
            {t('sidebar.customers')}
          </Link>
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link href={`/${lang}`} className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center gap-2">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-[#151820] border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-base font-semibold text-white">{t('panelTitle')}</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-orange-500/20">
              A
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
