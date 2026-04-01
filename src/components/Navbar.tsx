"use client"

import Link from "next/link"
import { logoutAction } from "@/app/[lang]/actions/auth"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function Navbar({ user, dict, lang }: { user: any, dict: any, lang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-[90]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-xl font-extrabold tracking-tight text-[var(--color-primary)]">
          Island Drive
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href={`/${lang}/fleet`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{dict.nav?.fleet || 'Fleet'}</Link>
          <Link href={`/${lang}/locations`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{dict.nav?.locations || 'Locations'}</Link>
          <Link href={`/${lang}/about`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{dict.nav?.about || 'About'}</Link>
          <Link href={`/${lang}/contact`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{dict.nav?.contact || 'Contact'}</Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center gap-4 text-sm font-semibold">
              {user.role === "admin" && (
                <Link href={`/${lang}/admin`} className="text-gray-500 hover:text-[var(--color-primary)] transition">Admin Panel</Link>
              )}
              <Link href={`/${lang}/profile`} className="text-gray-600">{user.name || user.email}</Link>
              <form action={logoutAction}>
                <button type="submit" className="text-red-500 hover:text-red-600 font-semibold">Logout</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={`/${lang}/login`} className="text-sm font-semibold text-gray-600 hover:text-[var(--color-primary)] transition">Log in</Link>
              <Link href={`/${lang}/register`} className="btn-primary text-sm !py-2.5 !px-5">Sign up</Link>
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
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <span className="text-sm font-medium text-gray-500">{dict.nav?.language || 'Language'}</span>
            <LanguageSwitcher />
          </div>
          <Link href={`/${lang}/fleet`} className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav?.fleet || 'Fleet'}</Link>
          <Link href={`/${lang}/locations`} className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav?.locations || 'Locations'}</Link>
          <Link href={`/${lang}/about`} className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav?.about || 'About'}</Link>
          <Link href={`/${lang}/contact`} className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav?.contact || 'Contact'}</Link>
          <div className="border-t border-gray-100 pt-4 mt-2">
            {user ? (
              <div className="flex flex-col gap-4">
                {user.role === "admin" && (
                  <Link href={`/${lang}/admin`} className="font-bold text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
                )}
                <Link href={`/${lang}/profile`} className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Profile ({user.name || user.email})</Link>
                <form action={logoutAction}>
                  <button type="submit" className="font-semibold text-red-500">Logout</button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href={`/${lang}/login`} className="font-semibold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                <Link href={`/${lang}/register`} className="font-bold text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
