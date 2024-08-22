import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = cookies().has("jwt-btracker");
  const { pathname } = request.nextUrl;

  if (!token && (pathname.startsWith("/cabinet") || pathname === "/")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token && (pathname === "/" || pathname === "/cabinet")) {
    return NextResponse.redirect(new URL("/cabinet/total-table", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|bot-payment-page|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
