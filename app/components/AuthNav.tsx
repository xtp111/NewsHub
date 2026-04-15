"use client";

import Link from "next/link";
import styled from "styled-components";
import { logout } from "@/app/actions/auth";
import type { User } from "@supabase/supabase-js";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
`;

const HomeLink = styled(Link)`
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: #111827;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserEmail = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const LoginLink = styled(Link)`
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  &:hover {
    color: #1e40af;
  }
`;

export default function AuthNav({ user }: { user: User | null }) {
  return (
    <Nav>
      <HomeLink href="/">My Art Search</HomeLink>
      <RightSection>
        {user ? (
          <>
            <UserEmail>{user.email}</UserEmail>
            <form action={logout}>
              <LogoutButton type="submit">Log Out</LogoutButton>
            </form>
          </>
        ) : (
          <LoginLink href="/login">Log In</LoginLink>
        )}
      </RightSection>
    </Nav>
  );
}
