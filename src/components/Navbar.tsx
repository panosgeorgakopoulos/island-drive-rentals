import Link from "next/link"
import { auth } from "@/lib/auth"
import { logoutAction } from "@/app/actions/auth"

export async function Navbar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
          Island Drive
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/fleet" className="text-gray-600 hover:text-blue-600 transition">Fleet</Link>
          <Link href="/locations" className="text-gray-600 hover:text-blue-600 transition">Locations</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 text-sm font-medium">
              {/* @ts-ignore NextAuth role type */}
              {user.role === "admin" && (
                <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition">Admin Panel</Link>
              )}
              <Link href="/profile" className="text-gray-600">{user.name || user.email}</Link>
              <form action={logoutAction}>
                <button type="submit" className="text-red-600 hover:text-red-700 font-medium">Logout</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Log in</Link>
              <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
