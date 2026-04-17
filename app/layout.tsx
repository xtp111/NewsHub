/**
 * Root Layout
 *
 * The top-level layout component for the entire Next.js application.
 * Responsibilities:
 * - Sets HTML metadata (title, description)
 * - Fetches the current Supabase user on the server side
 * - Renders the Navbar with the user prop for auth status display
 * - Wraps all page content with StyledComponentsRegistry (SSR styles + BookmarkProvider)
 * - Adds 64px top padding to main content to account for the fixed navbar
 */

import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import Navbar from "./components/Navbar";
import { createClient } from "@/lib/supabase/server";

// Application-wide metadata for SEO
export const metadata: Metadata = {
  title: "NewsHub | CS601GW",
  description: "Get the latest news updates",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the authenticated user from Supabase on the server
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {/* Navbar receives user prop for conditional auth display */}
          <Navbar user={user} />
          {/* Main content area offset by navbar height (64px) */}
          <main style={{ paddingTop: "64px" }}>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
