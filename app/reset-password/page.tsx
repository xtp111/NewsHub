/**
 * Reset Password Page - /reset-password
 *
 * Form for setting a new password after clicking the reset link from email.
 * The user arrives here via the auth callback with an active session.
 * Uses Supabase's updateUser method through a server action.
 * Validates password confirmation match on the server side.
 * Redirects to /login on successful password update.
 */

"use client";

import { useActionState } from "react";
import { resetPassword } from "@/app/actions/auth";
import styled from "styled-components";

/* --- Styled Components for Auth Forms --- */

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

/* --- Component --- */

export default function ResetPasswordPage() {
  // useActionState manages form state and pending status for the server action
  const [state, formAction, pending] = useActionState(resetPassword, null);

  return (
    <Main>
      <Card>
        <Title>Set New Password</Title>
        <Subtitle>Enter your new password below.</Subtitle>

        {state?.error && (
          <ErrorBox>
            <ErrorText>{state.error}</ErrorText>
          </ErrorBox>
        )}

        <Form action={formAction}>
          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
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
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your new password"
              required
              minLength={6}
            />
          </FormGroup>
          <Button type="submit" disabled={pending}>
            {pending ? "Updating..." : "Update Password"}
          </Button>
        </Form>
      </Card>
    </Main>
  );
}
