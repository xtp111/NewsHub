/**
 * Login Page - /login
 *
 * Email/password login form with Google OAuth option.
 * Uses React 19's useActionState for form handling with server actions.
 * Displays error messages from failed login attempts or auth callback errors.
 * Includes links to sign-up and forgot-password pages.
 */

"use client";

import { useActionState } from "react";
import { login, signInWithGoogle } from "@/app/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

/* --- Styled Components for Auth Forms --- */

// Centered page container
const Main = styled.main`
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
  &:focus {
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #1d4ed8;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled.button`
  background-color: white;
  color: #1f2937;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  width: 100%;
  &:hover {
    background-color: #f9fafb;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorBox = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-weight: 500;
  margin: 0;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #e5e7eb;
  }
`;

const ForgotLink = styled(Link)`
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  text-align: right;
  &:hover {
    color: #1e40af;
  }
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #1e40af;
  }
`;

/* --- Component --- */

export default function LoginPage() {
  const searchParams = useSearchParams();
  // Check for auth callback errors (e.g., from OAuth redirect failure)
  const callbackError = searchParams.get("error");

  // useActionState hooks for handling form submissions with server actions
  const [loginState, loginAction, loginPending] = useActionState(login, null);
  const [, googleAction, googlePending] = useActionState(
    signInWithGoogle,
    null
  );

  // Combine possible error sources: form submission error or OAuth callback error
  const errorMessage =
    loginState?.error ||
    (callbackError === "auth_callback_error"
      ? "Authentication failed. Please try again."
      : null);

  return (
    <Main>
      <Card>
        <Title>Log In</Title>
        <Subtitle>Welcome back! Sign in to your account.</Subtitle>

        {errorMessage && (
          <ErrorBox>
            <ErrorText>{errorMessage}</ErrorText>
          </ErrorBox>
        )}

        <Form action={loginAction}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              required
            />
          </FormGroup>
          <ForgotLink href="/forgot-password">Forgot password?</ForgotLink>
          <Button type="submit" disabled={loginPending}>
            {loginPending ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        <Divider>or</Divider>

        <form action={googleAction}>
          <GoogleButton type="submit" disabled={googlePending}>
            {googlePending ? "Redirecting..." : "Continue with Google"}
          </GoogleButton>
        </form>

        <FooterText>
          Don&apos;t have an account?{" "}
          <StyledLink href="/signup">Sign up</StyledLink>
        </FooterText>
      </Card>
    </Main>
  );
}
