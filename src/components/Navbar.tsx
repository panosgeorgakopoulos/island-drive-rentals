"use client";

import Link from "next/link"
import { logoutAction } from "@/app/[lang]/actions/auth"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { MobileMenu } from "./MobileMenu"
import { useTranslations } from 'next-intl'

export function Navbar({ user, lang }: { user: any, lang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations('nav')

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
      return () => {
        document.body.style.removeProperty("overflow")
        document.documentElement.style.removeProperty("overflow")
      }
    }
    document.body.style.removeProperty("overflow")
    document.documentElement.style.removeProperty("overflow")
    return () => {
      document.body.style.removeProperty("overflow")
      document.documentElement.style.removeProperty("overflow")
    }
  }, [isMobileMenuOpen])

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-[9999] w-full pointer-events-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-xl font-extrabold tracking-tight text-[var(--color-primary)]">
          Island Drive
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href={`/${lang}/fleet`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{t('fleet')}</Link>
          <Link href={`/${lang}/locations`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{t('locations')}</Link>
          <Link href={`/${lang}/about`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{t('about')}</Link>
          <Link href={`/${lang}/contact`} className="text-gray-500 hover:text-[var(--color-primary)] transition">{t('contact')}</Link>
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
          className="md:hidden text-gray-700 focus:outline-none relative z-[10001] pointer-events-auto cursor-pointer p-2 hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        user={user} 
        lang={lang} 
      />
    </header>
  )
}
