import { SignInForm } from "@/components/auth/SignInForm";

import { submitActionSignIn } from "@/lib/actions/auth";

import React from "react";

function page() {
  return (
    <>
      <SignInForm onSubmit={submitActionSignIn} />
    </>
  );
}

export default page;
