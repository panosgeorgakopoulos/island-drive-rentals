import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const locales = ['en', 'el', 'fr', 'it', 'es', 'de', 'sv', 'no']
const defaultLocale = 'en'

export default auth((req) => {
  const { nextUrl } = req
  const pathname = nextUrl.pathname
  const isLoggedIn = !!req.auth
  const user = req.auth?.user as { role?: string } | undefined

  // Check if pathname starts with a supported locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url))
  }

  // NextAuth protection Logic verification
  const localeMatch = locales.find((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) || defaultLocale
  const isAdminRoute = pathname.includes('/admin')
  const isAuthRoute = pathname.includes('/login') || pathname.includes('/register')

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(`/${localeMatch}${user?.role === 'admin' ? '/admin' : '/'}`, nextUrl))
    }
    return null
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/${localeMatch}/login`, nextUrl))
    }
    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL(`/${localeMatch}/login?error=unauthorized`, nextUrl))
    }
    return null
  }

  return null
})

// Strict config object matcher bypassing Next.js internal paths and statics
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}
