import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

const defaultLocale = "en";

const nextIntlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let url = request.nextUrl.clone();

  const redirectStatus = 301; // status here

  if (pathname === "/") {
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, redirectStatus);
  }

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url, redirectStatus);
  }

  // Continue with next-intl middleware if locale is already present
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|socials-handler).*)"],
};
