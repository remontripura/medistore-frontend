import { LoginForm } from "@/modules/authentication/login-form";
import { RegisterForm } from "@/modules/authentication/register-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Medistore | Sign-Up",
  description: "Medistore",
};
export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
