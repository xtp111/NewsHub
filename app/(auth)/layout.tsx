"use client";

import { Main, AuthCard } from "@/components/primitives";
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <AuthCard>{children}</AuthCard>
    </Main>
  );
}
