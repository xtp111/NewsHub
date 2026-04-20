// Member: Aiqi Xu
// RootLayout

import type { Metadata } from "next";
import "./globals.css";
import { StyledRegistry, ClientProviders } from "./providers";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";
import React from "react";

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
        <StyledRegistry>
          <ClientProviders>
            <Navbar user={user} />
            {/* Padding Top: for navbar */}
            <main style={{ paddingTop: "64px" }}>{children}</main>
          </ClientProviders>
        </StyledRegistry>
      </body>
    </html>
  );
}
