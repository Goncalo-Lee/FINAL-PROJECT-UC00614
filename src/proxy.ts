import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {getSessionCookie} from "better-auth/cookies";




export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    const isAuthRoute = pathname.startsWith("/login");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Sem cookie de sessão a tentar aceder ao painel
    if (isDashboardRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Com sessão válida a tentar aceder ao login
    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard:path*", "/login"], // Specify the routes the middleware applies to
};

/*


import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Sem cookie de sessão a tentar aceder ao painel
  if (isDashboardRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Com sessão válida a tentar aceder ao login
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/auth/:path*"],
};
 */