// Member: Aiqi Xu
// Layout wrapper for authentication pages

"use client";

import { AuthMain, AuthCard } from "@/components/primitives";
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthMain>
      <AuthCard>{children}</AuthCard>
    </AuthMain>
  );
}
