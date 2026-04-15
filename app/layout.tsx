import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import Navbar from "./components/Navbar";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NewsHub",
  description: "Get the latest news updates",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="zh-CN">
      <body>
        <StyledComponentsRegistry>
          <Navbar user={user} />
          <main style={{ paddingTop: "64px" }}>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
