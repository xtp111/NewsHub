// Member: Yuchen Bao
// Navbar: responsive for laptop (whole menu) & mobile view (drop-down menu)

"use client";

import Link from "next/link";
import styled from "styled-components";
import { logout } from "@/server/actions/auth";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";


// Styled components for laptop view

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border-subtle);
  z-index: 100;
`;

const NavBar = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  max-width: 95vw;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
    flex-shrink: 0;

    &:hover {
        color: var(--color-primary);
    }
`;

const NavLinks = styled.div`
  display: flex;
  padding: 0 2rem;
  gap: 2rem;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
    font-size: 0.9rem;
    color: var(--color-text-subtle);
    text-decoration: none;
    font-weight: 500;

    &:hover {
        color: var(--color-primary);
    }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const UserEmail = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-subtle);
  max-width: clamp(2rem, 10rem, 10vw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    font-size: 0.85rem;
    color: var(--color-text-subtle);
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
`;

const LoginLink = styled(Link)`
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary-dark);
  }
`;


// Styled components for mobile view

const HamburgerButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--color-text-subtle);

    @media screen and (max-width: 750px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  padding: 0.5rem 2rem 1.5rem;
  border-top: 1px solid var(--color-border-subtle);
  gap: 5%;

  @media screen and (min-width: 750px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
    font-size: 0.9rem;
    color: var(--color-text-subtle);
    text-decoration: none;
    font-weight: 500;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-bg-subtle);

    &:last-of-type {
        border-bottom: none;
    }

    &:hover {
        color: var(--color-primary);
    }
`;

const MobileAuthRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  gap: 0.8rem;
`;

const MobileUserEmail = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-subtle);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

// Hamburger SVG Icon for mobile menu drop-down button
function HamburgerIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar({ user }: { user: User | null }) {

  // State of mobile drop-down menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <NavBar>
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
        <HamburgerButton
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <HamburgerIcon open={menuOpen} />
        </HamburgerButton>
      </NavBar>
      <MobileMenu $open={menuOpen}>
        <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
        <MobileNavLink href="/search" onClick={() => setMenuOpen(false)}>Search</MobileNavLink>
        <MobileNavLink href="/bookmarks" onClick={() => setMenuOpen(false)}>Bookmarks</MobileNavLink>
        <MobileAuthRow>
          {user ? (
            <>
              <MobileUserEmail>{user.email}</MobileUserEmail>
              <form action={logout}>
                <LogoutButton type="submit">Log Out</LogoutButton>
              </form>
            </>
          ) : (
            <LoginLink href="/login" onClick={() => setMenuOpen(false)}>Log In</LoginLink>
          )}
        </MobileAuthRow>
      </MobileMenu>
    </Nav>
  );
}
