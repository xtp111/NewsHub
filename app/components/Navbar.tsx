/**
 * Navbar Component
 *
 * Fixed-position top navigation bar that combines site navigation with auth status.
 * - Left: App logo linking to home
 * - Center: Navigation links (Home, Search, Bookmarks)
 * - Right: User email + logout button (if authenticated) or login link (if not)
 *
 * Receives the current Supabase user as a prop from the server-rendered RootLayout.
 */


import Link from "next/link";
import styled from "styled-components";
import { logout } from "@/app/actions/auth";
import type { User } from "@supabase/supabase-js";

/* --- Styled Components --- */

// Fixed navbar container pinned to the top of the viewport
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

// Centered content container with max-width constraint
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// App logo/brand link
const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;

  &:hover {
    color: #0066cc;
  }
`;

// Navigation links group in the center
const NavLinks = styled.div`
  display: flex;
  gap: 32px;
`;

// Individual navigation link style
const NavLink = styled(Link)`
  font-size: 15px;
  color: #555;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #0066cc;
  }
`;

// Right-side section for auth-related controls
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// Display for the authenticated user's email
const UserEmail = styled.span`
  font-size: 13px;
  color: #666;
`;

// Logout button styled as a subtle bordered button
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

// Login link shown when user is not authenticated
const LoginLink = styled(Link)`
  color: #0066cc;
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #0052a3;
  }
`;

/* --- Component --- */

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
          {/* Show user email and logout if authenticated; otherwise show login link */}
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
