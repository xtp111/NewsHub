// Member: Tianpeng Xu
// Server-side actions for Supabase authentication

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Sign in with email and password; redirects to home on success
export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

// Register a new account; returns success message for email confirmation
export async function signup(
  prevState: { error: string; success?: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate password confirmation match
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is enabled and identities array is empty,
  // the user likely already exists
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: "An account with this email already exists." };
  }

  return {
    error: "",
    success: "Check your email to confirm your account.",
  };
}

// Send a password reset email with a redirect to /reset-password
export async function forgotPassword(
  prevState: { error: string; success?: string } | null,
  formData: FormData
) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    error: "",
    success: "Check your email for a password reset link.",
  };
}

// Update the user's password (called after clicking the reset link)
export async function resetPassword(
  prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate password confirmation match
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/login");
}

// Sign out the current user and redirect to the login page
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// Initiate Google OAuth sign-in; redirects to Google's consent screen
export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Redirect to Google's OAuth consent screen
  if (data.url) {
    redirect(data.url);
  }
}
