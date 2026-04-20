// Member: Tianpeng Xu
// Supabase Server Client:
// Creates a Supabase client for use in Server Components, Server Actions, and Route Handlers.
// Uses createServerClient from @supabase/ssr with cookie-based session management.
// The cookie handler reads from and writes to the Next.js cookies() store.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read all cookies from the request for session hydration
        getAll() {
          return cookieStore.getAll();
        },
        // Write updated session cookies back to the response
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from Server Components where cookies are read-only.
            // This can safely be ignored if proxy refreshes sessions.
          }
        },
      },
    }
  );
}
