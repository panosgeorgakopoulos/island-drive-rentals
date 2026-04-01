import Link from "next/link";
import { LayoutDashboard, Car, CalendarDays, Users, Tag } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b font-bold text-xl text-blue-600">
          Island Drive Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/fleet" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Car size={20} />
            Fleet Management
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <CalendarDays size={20} />
            Bookings
          </Link>
          <Link href="/admin/pricing" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Tag size={20} />
            Pricing & Extras
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Users size={20} />
            Customers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
