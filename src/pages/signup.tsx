import LandingDefaultLayout from "@/layouts/landing-default";
import { SignUpForm } from "@/components/auth-components/signup-form";

export default function SignupPage() {
  return (
    <LandingDefaultLayout>
      <SignUpForm />
    </LandingDefaultLayout>
  );
}
