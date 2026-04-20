"use client";

import { useActionState } from "react";
import { login, signInWithGoogle } from "@/server/actions/auth";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import {
  AuthTitle,
  AuthSubtitle,
  Form,
  FormGroup,
  Label,
  TextInput,
  PrimaryButton,
  SecondaryButton,
  ErrorBox,
  ErrorText,
  Divider,
  BrandLink,
  FooterText,
} from "@/components/primitives";

const ForgotLink = styled(BrandLink)`
  font-size: 0.875rem;
  text-align: right;
  font-weight: 400;
`;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");
  const [loginState, loginAction, loginPending] = useActionState(login, null);
  const [, googleAction, googlePending] = useActionState(signInWithGoogle, null);

  const errorMessage =
    loginState?.error ||
    (callbackError === "auth_callback_error"
      ? "Authentication failed. Please try again."
      : null);

  return (
    <>
      <AuthTitle>Log In</AuthTitle>
      <AuthSubtitle>Welcome back! Sign in to your account.</AuthSubtitle>

      {errorMessage && (
        <ErrorBox>
          <ErrorText>{errorMessage}</ErrorText>
        </ErrorBox>
      )}

      <Form action={loginAction}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" type="email" placeholder="you@example.com" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <TextInput id="password" name="password" type="password" placeholder="Your password" required />
        </FormGroup>
        <ForgotLink href="/forgot-password">Forgot password?</ForgotLink>
        <PrimaryButton type="submit" disabled={loginPending}>
          {loginPending ? "Logging in..." : "Log In"}
        </PrimaryButton>
      </Form>

      <Divider>or</Divider>

      <form action={googleAction}>
        <SecondaryButton type="submit" disabled={googlePending}>
          {googlePending ? "Redirecting..." : "Continue with Google"}
        </SecondaryButton>
      </form>

      <FooterText>
        Don&apos;t have an account? <BrandLink href="/signup">Sign up</BrandLink>
      </FooterText>
    </>
  );
}
