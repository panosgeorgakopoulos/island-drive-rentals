"use client"

import Link from "next/link"
import { logoutAction } from "@/app/actions/auth"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar({ user }: { user: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-[90]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-[var(--color-primary)]">
          Island Drive
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/fleet" className="text-gray-500 hover:text-[var(--color-primary)] transition">Fleet</Link>
          <Link href="/locations" className="text-gray-500 hover:text-[var(--color-primary)] transition">Locations</Link>
          <Link href="/about" className="text-gray-500 hover:text-[var(--color-primary)] transition">About</Link>
          <Link href="/contact" className="text-gray-500 hover:text-[var(--color-primary)] transition">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 text-sm font-semibold">
              {user.role === "admin" && (
                <Link href="/admin" className="text-gray-500 hover:text-[var(--color-primary)] transition">Admin Panel</Link>
              )}
              <Link href="/profile" className="text-gray-600">{user.name || user.email}</Link>
              <form action={logoutAction}>
                <button type="submit" className="text-red-500 hover:text-red-600 font-semibold">Logout</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-[var(--color-primary)] transition">Log in</Link>
              <Link href="/register" className="btn-primary text-sm !py-2.5 !px-5">Sign up</Link>
            </div>
          )}
        </div>
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 shadow-xl absolute w-full left-0 flex flex-col gap-4">
          <Link href="/fleet" className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Fleet</Link>
          <Link href="/locations" className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Locations</Link>
          <Link href="/about" className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="border-t border-gray-100 pt-4 mt-2">
            {user ? (
              <div className="flex flex-col gap-4">
                {user.role === "admin" && (
                  <Link href="/admin" className="font-bold text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
                )}
                <Link href="/profile" className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Profile ({user.name || user.email})</Link>
                <form action={logoutAction}>
                  <button type="submit" className="font-semibold text-red-500">Logout</button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                <Link href="/register" className="font-bold text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
