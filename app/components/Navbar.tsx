"use client";

import Link from "next/link";
import styled from "styled-components";
import { logout } from "@/app/actions/auth";
import type { User } from "@supabase/supabase-js";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;

  &:hover {
    color: #0066cc;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
`;

const NavLink = styled(Link)`
  font-size: 15px;
  color: #555;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #0066cc;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserEmail = styled.span`
  font-size: 13px;
  color: #666;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 13px;
  color: #555;
  cursor: pointer;

  &:hover {
    border-color: #0066cc;
    color: #0066cc;
  }
`;

const LoginLink = styled(Link)`
  color: #0066cc;
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #0052a3;
  }
`;

export default function Navbar({ user }: { user: User | null }) {
  return (
    <Nav>
      <Container>
        <Logo href="/">NewsHub</Logo>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/search">Search</NavLink>
          <NavLink href="/bookmarks">Bookmarks</NavLink>
        </NavLinks>
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
      </Container>
    </Nav>
  );
}
