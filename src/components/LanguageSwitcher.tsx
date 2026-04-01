"use client"

import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const locales = [
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'el', flag: '🇬🇷', name: 'EL' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' },
    { code: 'it', flag: '🇮🇹', name: 'IT' },
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'de', flag: '🇩🇪', name: 'DE' },
    { code: 'sv', flag: '🇸🇪', name: 'SV' },
    { code: 'no', flag: '🇳🇴', name: 'NO' },
  ]

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    // Replace the first segment (which is the locale)
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <select 
      className="bg-transparent text-sm font-semibold text-gray-600 focus:outline-none cursor-pointer hover:text-[var(--color-primary)] transition"
      onChange={(e) => {
        router.push(redirectedPathName(e.target.value))
      }}
      defaultValue={pathname?.split('/')[1] || 'en'}
    >
      {locales.map((loc) => (
        <option key={loc.code} value={loc.code}>
          {loc.flag} {loc.name}
        </option>
      ))}
    </select>
  )
}
