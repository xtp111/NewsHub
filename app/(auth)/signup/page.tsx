"use client";

import { useActionState } from "react";
import { signup, signInWithGoogle } from "@/server/actions/auth";
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
  SuccessBox,
  SuccessText,
  Divider,
  BrandLink,
  FooterText,
} from "@/styles/primitives";

export default function SignupPage() {
  const [signupState, signupAction, signupPending] = useActionState(signup, null);
  const [, googleAction, googlePending] = useActionState(signInWithGoogle, null);

  return (
    <>
      <AuthTitle>Create Account</AuthTitle>
      <AuthSubtitle>Sign up with your email and password.</AuthSubtitle>

      {signupState?.error && (
        <ErrorBox>
          <ErrorText>{signupState.error}</ErrorText>
        </ErrorBox>
      )}

      {signupState?.success && (
        <SuccessBox>
          <SuccessText>{signupState.success}</SuccessText>
        </SuccessBox>
      )}

      <Form action={signupAction}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" type="email" placeholder="you@example.com" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            required
            minLength={6}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            required
            minLength={6}
          />
        </FormGroup>
        <PrimaryButton type="submit" disabled={signupPending}>
          {signupPending ? "Creating account..." : "Sign Up"}
        </PrimaryButton>
      </Form>

      <Divider>or</Divider>

      <form action={googleAction}>
        <SecondaryButton type="submit" disabled={googlePending}>
          {googlePending ? "Redirecting..." : "Continue with Google"}
        </SecondaryButton>
      </form>

      <FooterText>
        Already have an account? <BrandLink href="/login">Log in</BrandLink>
      </FooterText>
    </>
  );
}
