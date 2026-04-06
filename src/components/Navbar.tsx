"use client";

import Link from "next/link"
import { logoutAction } from "@/app/[lang]/actions/auth"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useTranslations } from 'next-intl'

export function Navbar({ user, lang }: { user: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-xl font-extrabold tracking-tight text-[var(--color-primary)]">
          Island Drive
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href={`/${lang}/fleet`} className="min-h-11 inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] transition">{t('fleet')}</Link>
          <Link href={`/${lang}/locations`} className="min-h-11 inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] transition">{t('locations')}</Link>
          <Link href={`/${lang}/about`} className="min-h-11 inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] transition">{t('about')}</Link>
          <Link href={`/${lang}/contact`} className="min-h-11 inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] transition">{t('contact')}</Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center gap-4 text-sm font-semibold">
              {user.role === "admin" && (
                <Link href={`/${lang}/admin`} className="min-h-11 inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] transition">Admin Panel</Link>
              )}
              <Link href={`/${lang}/profile`} className="min-h-11 inline-flex items-center text-gray-600">{user.name || user.email}</Link>
              <form action={logoutAction}>
                <button type="submit" className="min-h-11 px-3 rounded-lg text-red-500 hover:text-red-600 transition">Logout</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/${lang}/login`} className="min-h-11 inline-flex items-center font-semibold text-gray-600 hover:text-[var(--color-primary)] transition">Log in</Link>
              <Link href={`/${lang}/register`} className="btn-primary min-h-11 inline-flex items-center px-5">Sign up</Link>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center rounded-xl border border-gray-200 text-gray-700"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-xl border border-gray-200 text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <Link href={`/${lang}/fleet`} onClick={() => setIsOpen(false)} className="min-h-11 px-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center">{t('fleet')}</Link>
            <Link href={`/${lang}/locations`} onClick={() => setIsOpen(false)} className="min-h-11 px-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center">{t('locations')}</Link>
            <Link href={`/${lang}/about`} onClick={() => setIsOpen(false)} className="min-h-11 px-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center">{t('about')}</Link>
            <Link href={`/${lang}/contact`} onClick={() => setIsOpen(false)} className="min-h-11 px-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center">{t('contact')}</Link>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="p-4 pt-0">
            {user ? (
              <div className="space-y-2">
                {user.role === "admin" && (
                  <Link href={`/${lang}/admin`} onClick={() => setIsOpen(false)} className="min-h-11 px-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center text-[var(--color-primary)]">Admin Panel</Link>
                )}
                <Link href={`/${lang}/profile`} onClick={() => setIsOpen(false)} className="min-h-11 px-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center">{user.name || user.email}</Link>
                <form action={logoutAction}>
                  <button type="submit" className="min-h-11 w-full text-left px-3 rounded-xl text-red-500 hover:bg-red-50 font-semibold">Logout</button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href={`/${lang}/login`} onClick={() => setIsOpen(false)} className="min-h-11 rounded-xl border border-gray-200 font-semibold flex items-center justify-center">Log in</Link>
                <Link href={`/${lang}/register`} onClick={() => setIsOpen(false)} className="btn-primary min-h-11 flex items-center justify-center">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
