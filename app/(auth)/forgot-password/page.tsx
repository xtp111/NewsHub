// Member: Aiqi Xu
// Forgot Password page using a server action for form submission

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
} from "@/components/primitives";

// Forgot Password page component
export default function ForgotPasswordPage() {
  // Handles form state, submission action, and loading state
  const [state, formAction, pending] = useActionState(forgotPassword, null);

  return (
    <>
      <AuthTitle>Reset Password</AuthTitle>
      <AuthSubtitle>Enter your email and we&apos;ll send you a reset link.</AuthSubtitle>

      {/* Display error message if request fails */}
      {state?.error && (
        <ErrorBox>
          <ErrorText>{state.error}</ErrorText>
        </ErrorBox>
      )}

      {/* Display success message when email is sent */}
      {state?.success && (
        <SuccessBox>
          <SuccessText>{state.success}</SuccessText>
        </SuccessBox>
      )}

      {/* Email submission form */}
      <Form action={formAction}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" type="email" placeholder="you@example.com" required />
        </FormGroup>
        <PrimaryButton type="submit" disabled={pending}>
          {pending ? "Sending..." : "Send Reset Link"}
        </PrimaryButton>
      </Form>

      {/* Navigate back to login page */}
      <BrandLink href="/login" style={{ fontSize: "0.85rem", display: "inline-block", marginTop: "1.5rem" }}>
        &larr; Back to log in
      </BrandLink>
    </>
  );
}
