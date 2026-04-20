// Member: Tianpeng Xu
// Next.js middleware that runs on every request (except static assets), handling Supabase session & auth routes protection.

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth-related pages that authenticated users should not access
const authPages = ["/login", "/signup", "/forgot-password"];

export async function proxy(request: NextRequest) {
  // Create the default "pass-through" response
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Initialize a Supabase server client with cookie-based session management
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read cookies from the incoming request
        getAll() {
          return request.cookies.getAll();
        },
        // Write updated session cookies to both the request and response
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Fetch the current user's session (also refreshes the session token)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAuthPage = authPages.some((p) => path === p);

  // Redirect authenticated users away from auth pages (they're already logged in)
  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users away from protected routes (if needed in the future)
  // Currently, all main pages are public; uncomment and configure when needed:
  // const protectedRoutes = ["/dashboard"];
  // const isProtected = protectedRoutes.some((p) => path.startsWith(p));
  // if (!user && isProtected) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}

// Matcher config: run middleware on all routes except static assets and images
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
