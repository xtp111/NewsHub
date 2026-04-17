/**
 * Forgot Password Page - /forgot-password
 *
 * Allows users to request a password reset link via email.
 * Uses Supabase's resetPasswordForEmail method through a server action.
 * Shows success or error messages after form submission.
 * Includes a back link to the login page.
 */

'use client'; // to use useActionState react hook

import { useActionState } from "react";
import { forgotPassword } from "@/app/actions/auth";
import Link from "next/link";
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

const SuccessBox = styled.div`
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  color: #1e40af;
  font-weight: 500;
  margin: 0;
`;

const FooterLink = styled(Link)`
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  display: inline-block;
  margin-top: 1.5rem;
  &:hover {
    color: #1e40af;
  }
`;

/* --- Component --- */

export default function ForgotPasswordPage() {
  // useActionState manages form state and pending status for the server action
  const [state, formAction, pending] = useActionState(forgotPassword, null);

  return (
    <Main>
      <Card>
        <Title>Reset Password</Title>
        <Subtitle>
          Enter your email and we&apos;ll send you a reset link.
        </Subtitle>

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
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </FormGroup>
          <Button type="submit" disabled={pending}>
            {pending ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form>

        <FooterLink href="/login">&larr; Back to log in</FooterLink>
      </Card>
    </Main>
  );
}
