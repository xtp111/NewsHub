"use client";

import { Main, AuthCard } from "@/styles/primitives";
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <AuthCard>{children}</AuthCard>
    </Main>
  );
}
