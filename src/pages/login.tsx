import { LoginForm } from "@/components/auth-components/login-form";
import LandingDefaultLayout from "@/layouts/landing-default";

export default function LoginPage() {
  return (
    <LandingDefaultLayout>
      <LoginForm />
    </LandingDefaultLayout>
  );
}
