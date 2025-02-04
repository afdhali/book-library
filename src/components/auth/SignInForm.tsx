"use client";

import { signInSchema } from "@/lib/validations";

import { z } from "zod";
import AuthForm from "./AuthForm";

// Definisikan type untuk form values
type SignInFormValues = z.infer<typeof signInSchema>;

// Definisikan type untuk props
interface SignInFormProps {
  onSubmit: (
    data: SignInFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    />
  );
}
