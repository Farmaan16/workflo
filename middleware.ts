import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  // Log request URL
  console.log("Request URL:", request.url);

  // Attempt to retrieve the token
  const token = await getToken({ req: request });

  // Log token details
  console.log("Token:", token);

  const url = request.nextUrl;

  if (!token && url.pathname.startsWith("/board")) {
    console.log("No token found, redirecting to /auth/sign-in");
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (
    token &&
    (url.pathname.startsWith("/auth/sign-in") ||
      url.pathname.startsWith("/auth/sign-up") ||
      url.pathname === "/")
  ) {
    console.log("User is authenticated, redirecting to /board");
    return NextResponse.redirect(new URL("/board", request.url));
  }

  // If no conditions are met, allow request to proceed
  console.log("Proceeding to the requested URL");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/board/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
    "/tasks/:path*",
  ], // Protect these routes
};
