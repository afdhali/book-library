import SignUpForm from "@/components/auth/SigUpForm";
import { submitActionSignUp } from "@/lib/actions/auth";

export default function SignUpPage() {
  return (
    <>
      <SignUpForm onSubmit={submitActionSignUp} />;
    </>
  );
}
