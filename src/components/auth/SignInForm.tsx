"use client";

import { signInSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { z } from "zod";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Sign in failed" };
    }
  };

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
