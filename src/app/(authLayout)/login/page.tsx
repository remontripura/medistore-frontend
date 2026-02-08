import { LoginForm } from "@/modules/authentication/login-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Medistore | login",
  description: "Medistore",
};
export default function LoginPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
