import { auth } from "@/lib/auth"
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user as { role?: string } | undefined;

  const isAuthRoute = pathname.includes('/login') || pathname.includes('/register');
  const isAdminRoute = pathname.includes('/admin');

  const localeMatch = routing.locales.find((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) || routing.defaultLocale;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(`/${localeMatch}${user?.role === 'admin' ? '/admin' : '/'}`, nextUrl));
    }
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/${localeMatch}/login`, nextUrl));
    }
    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL(`/${localeMatch}/login?error=unauthorized`, nextUrl));
    }
  }

  // Allow next-intl to handle the routing and parsing
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
