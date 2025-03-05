// "use client";
import { useState } from "react";
import { Button, Input, Checkbox, Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { RoleSelection } from "@/components/auth-components/role-selection";
import { Logo, FacebookIcon2 } from "@/components/icons";
import useFeedback from "@/hooks/useFeedback";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

interface RegisterResponse {
  message: string;
}

export const SignUpForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm<RegisterRequest>({
    mode: "onChange",
    defaultValues: {
      role: "customer",
    },
  });

  const role = watch("role", "customer");

  const navigate = useNavigate();

  const { feedback, setFeedback } = useFeedback();

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    sessionStorage.setItem("registeredEmail", data.email);
    fetch("/Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data: RegisterResponse) => {
        sessionStorage.setItem("registeredEmail", data.message);
        navigate(ROUTES.LOGIN);
      })
      .catch((error) => {
        setFeedback({
          message: error.message || "Failed to sign up. Please try again.",
          intent: "error",
        });
      });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo size={60} />
          <p className="text-xl font-medium">Welcome</p>
          <p className="text-small text-default-500">
            Create an account to get started
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Input
              isRequired
              classNames={{
                inputWrapper:
                  "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              radius="md"
              type="text"
              validate={() => {
                if (
                  firstName.match(
                    "^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$",
                  ) === null
                ) {
                  return "Please enter a valid first name.";
                }
              }}
              variant="bordered"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              isRequired
              classNames={{
                inputWrapper:
                  "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              radius="md"
              type="text"
              validate={() => {
                if (
                  lastName.match(
                    "^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$",
                  ) === null
                ) {
                  return "Please enter a valid first name.";
                }
              }}
              variant="bordered"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            errorMessage="Please enter a valid email address."
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            radius="md"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            radius="md"
            type={isVisible ? "text" : "password"}
            validate={() => {
              if (password.length < 8) {
                return "Password must be at least 8 characters long.";
              }
            }}
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            radius="md"
            type={isConfirmVisible ? "text" : "password"}
            validate={() => {
              if (password !== confirmPassword && confirmPassword.length > 0) {
                return "Passwords do not match.";
              }
            }}
            variant="bordered"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <RoleSelection />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" isLoading={isLoading} type="submit">
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Sign Up with Google
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<FacebookIcon2 width={24} />}
            variant="bordered"
          >
            Sign Up with Facebook
          </Button>
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
