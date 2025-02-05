// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return null;
  }

  if (!token) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /.next/static (static files)
     * 4. /.next/image (image optimization files)
     * 5. /favicon.ico (favicon file)
     * 6. /public (public files)
     * 7. /icons (public/icons)
     * 8. /images (public/images)
     */
    "/((?!api|_next|.next/static|.next/image|favicon.ico|public|icons|images).*)",
    "/sign-in",
    "/sign-up",
  ],
};
