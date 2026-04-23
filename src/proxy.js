// middleware.js (di root project, bukan app/)
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export const proxy = (request) => {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  let isValid = false;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);

    isValid = exp > now;
  } catch {
    isValid = false;
  }

  // Belum login, akses protected route
  if (!isValid && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Sudah login, akses login page
  if (isValid && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
