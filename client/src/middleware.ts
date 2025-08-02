import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function isTokenExpired(token: string): boolean {
  try {
    // Decode the payload (second part of JWT)
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if exp exists and if current time is past expiration
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return currentTime > payload.exp;
    }

    return false; // If no exp claim, consider it valid
  } catch (error) {
    return true; // If we can't decode, consider it expired/invalid
  }
}

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = await cookieStore.get("jwt");

  if (!token || isTokenExpired(token.value)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // You can add more logic here if needed, such as checking the token validity
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/dashboard/:path*"],
};
