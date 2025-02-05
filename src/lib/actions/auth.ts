// src/lib/actions/auth.ts
"use server";

import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { hash } from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";
import { signIn } from "../auth";

type SignInFormData = {
  email: string;
  password: string;
};

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
};

export async function submitActionSignIn(
  data: Pick<AuthCredentials, "email" | "password">
) {
  const { email, password } = data;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
}

export async function submitActionSignUp(data: AuthCredentials) {
  const { fullName, email, universityId, password, universityCard } = data;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId: Number(universityId),
      password: hashedPassword,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await submitActionSignIn({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
}
