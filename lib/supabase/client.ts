/**
 * Supabase Browser Client
 *
 * Creates a Supabase client for use in client-side React components.
 * Uses createBrowserClient from @supabase/ssr for cookie-based auth in the browser.
 * Reads the Supabase URL and anonymous key from public environment variables.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
