import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const user = req.auth?.user as { role?: string } | undefined

  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = nextUrl.pathname.startsWith('/login')
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(user?.role === 'admin' ? '/admin' : '/', nextUrl))
    }
    return null
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', nextUrl))
    }
    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', nextUrl))
    }
    return null
  }

  // Add more protection if needed for /book
  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
