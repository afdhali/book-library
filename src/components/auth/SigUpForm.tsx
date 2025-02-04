"use client";

import { signUpSchema } from "@/lib/validations";
import { z } from "zod";
import AuthForm from "./AuthForm";

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSubmit: (
    data: SignUpFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

const fieldOrder = [
  "fullName",
  "email",
  "password",
  "universityId",
  "universityCard",
];

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      fieldOrder={fieldOrder}
      onSubmit={onSubmit}
    />
  );
}
