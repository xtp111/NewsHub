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

export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState(resetPassword, null);

  return (
    <>
      <AuthTitle>Set New Password</AuthTitle>
      <AuthSubtitle>Enter your new password below.</AuthSubtitle>

      {state?.error && (
        <ErrorBox>
          <ErrorText>{state.error}</ErrorText>
        </ErrorBox>
      )}

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
        <PrimaryButton type="submit" disabled={pending}>
          {pending ? "Updating..." : "Update Password"}
        </PrimaryButton>
      </Form>
    </>
  );
}
