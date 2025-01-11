import SignUpForm from "@/src/components/ui/auth/signup-form";

export default function SignUp() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SignUpForm />
    </div>
  );
}
