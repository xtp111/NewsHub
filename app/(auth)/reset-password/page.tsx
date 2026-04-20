// Member: Aiqi Xu
// Reset password page using server action

"use client";

import { useActionState } from "react";
import { resetPassword } from "@/server/actions/auth";
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
} from "@/components/primitives";

// Reset password page component
export default function ResetPasswordPage() {
  // Handles form state, submission, and loading state
  const [state, formAction, pending] = useActionState(resetPassword, null);

  return (
    <>
      <AuthTitle>Set New Password</AuthTitle>
      <AuthSubtitle>Enter your new password below.</AuthSubtitle>

      {/*Display error message if reset fails*/}
      {state?.error && (
        <ErrorBox>
          <ErrorText>{state.error}</ErrorText>
        </ErrorBox>
      )}

      {/*New password submission form*/}
      <Form action={formAction}>
        <FormGroup>
          <Label htmlFor="password">New Password</Label>
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
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your new password"
            required
            minLength={6}
          />
        </FormGroup>
        {/*Submit button with loading state*/}
        <PrimaryButton type="submit" disabled={pending}>
          {pending ? "Updating..." : "Update Password"}
        </PrimaryButton>
      </Form>
    </>
  );
}
