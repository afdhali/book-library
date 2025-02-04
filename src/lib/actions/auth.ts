// src/lib/actions/auth.ts
"use server";

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

export async function submitActionSignIn(data: SignInFormData) {
  // Simulasi delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Server received:", data);

  // Dummy validation
  if (data.email === "test@test.com" && data.password === "password123") {
    return { success: true };
  }

  return {
    success: false,
    error: "Invalid email or password",
  };
}

export async function submitActionSignUp(data: SignUpFormData) {
  // Simulasi delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Server received signup data:", data);

  // Dummy validation
  if (data.email.includes("@university.edu")) {
    return { success: true };
  }

  // Simulasi beberapa kemungkinan error
  if (!data.universityCard) {
    return {
      success: false,
      error: "University ID Card is required",
    };
  }

  if (data.email === "existing@university.edu") {
    return {
      success: false,
      error: "Email already registered",
    };
  }

  return {
    success: false,
    error: "Please use your university email",
  };
}
