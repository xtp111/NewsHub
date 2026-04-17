"use client";

import { Main, AuthCard } from "@/styles/primitives";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <AuthCard>{children}</AuthCard>
    </Main>
  );
}
