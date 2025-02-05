// src/lib/auth.ts
import NextAuth from "next-auth";
import { authOptions } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
