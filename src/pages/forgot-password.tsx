import LandingDefaultLayout from "@/layouts/landing-default";
import { ForgotPasswordForm } from "@/components/auth-components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <LandingDefaultLayout>
      <ForgotPasswordForm />
    </LandingDefaultLayout>
  );
}
