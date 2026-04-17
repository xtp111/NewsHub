"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/server/actions/auth";
import {
  AuthTitle,
  AuthSubtitle,
  Form,
  FormGroup,
  Label,
  TextInput,
  PrimaryButton,
  ErrorBox,
  ErrorText,
  SuccessBox,
  SuccessText,
  BrandLink,
} from "@/styles/primitives";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPassword, null);

  return (
    <>
      <AuthTitle>Reset Password</AuthTitle>
      <AuthSubtitle>Enter your email and we&apos;ll send you a reset link.</AuthSubtitle>

      {state?.error && (
        <ErrorBox>
          <ErrorText>{state.error}</ErrorText>
        </ErrorBox>
      )}

      {state?.success && (
        <SuccessBox>
          <SuccessText>{state.success}</SuccessText>
        </SuccessBox>
      )}

      <Form action={formAction}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" type="email" placeholder="you@example.com" required />
        </FormGroup>
        <PrimaryButton type="submit" disabled={pending}>
          {pending ? "Sending..." : "Send Reset Link"}
        </PrimaryButton>
      </Form>

      <BrandLink href="/login" style={{ fontSize: "0.875rem", display: "inline-block", marginTop: "1.5rem" }}>
        &larr; Back to log in
      </BrandLink>
    </>
  );
}
