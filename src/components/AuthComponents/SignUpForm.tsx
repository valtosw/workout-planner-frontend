// "use client";
import { useEffect, useState } from "react";
import { Button, Input, Link, Divider, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { RoleSelection } from "@/components/AuthComponents/RoleSelection";
import {
  Logo,
  FacebookIcon2,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/icons";
import { ROUTES } from "@/constants/Routes";
import axios from "@/api/axios";

function delay(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

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
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [emailSave, setEmailSave] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post(
          "/Auth/CheckEmailConfirmation",
          { email: emailSave },
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.data === true) {
          setIsEmailConfirmed(true);
          clearInterval(interval);
          delay(10000);
          setEmailSave("");
          navigate(ROUTES.LOGIN);
        }
      } catch (error) {
        return;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate, formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setEmailSave(formData.email);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const validate = (): boolean => {
    let newErrors: { [key: string]: string } = {};

    if (
      !formData.firstName.match(/^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$/)
    ) {
      newErrors.firstName = "Please enter a valid first name.";
    }

    if (
      !formData.lastName.match(/^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$/)
    ) {
      newErrors.lastName = "Please enter a valid last name.";
    }

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");
    setRegistrationMessage(null);

    try {
      const response = await axios.post<RegisterResponse>(
        "/Auth/Register",
        formData,
      );

      setRegistrationMessage({
        type: "success",
        message:
          response.data.message || "Registration successful! Please log in.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer",
      });
    } catch (error: any) {
      setRegistrationMessage({
        type: "error",
        message: error.response?.data?.message || "Registration failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <form className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Input
              isRequired
              classNames={{
                inputWrapper:
                  "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              errorMessage={errors.firstName}
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              radius="md"
              type="text"
              validate={(value) => {
                if (
                  !value.match(/^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$/)
                ) {
                  return "Please enter a valid first name.";
                }
              }}
              value={formData.firstName}
              variant="bordered"
              onChange={handleChange}
            />

            <Input
              isRequired
              classNames={{
                inputWrapper:
                  "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              errorMessage={errors.lastName}
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              radius="md"
              type="text"
              validate={(value) => {
                if (
                  !value.match(/^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$/)
                ) {
                  return "Please enter a valid last name.";
                }
              }}
              value={formData.lastName}
              variant="bordered"
              onChange={handleChange}
            />
          </div>
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            errorMessage={errors.email}
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            radius="md"
            type="email"
            validate={(value) => {
              if (!value.match(/^\S+@\S+\.\S+$/)) {
                return "Please enter a valid email address";
              }
            }}
            value={formData.email}
            variant="bordered"
            onChange={handleChange}
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
            errorMessage={errors.password}
            label="Password"
            name="password"
            placeholder="Enter your password"
            radius="md"
            type={isVisible ? "text" : "password"}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters long.";
              }
            }}
            value={formData.password}
            variant="bordered"
            onChange={handleChange}
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
            errorMessage={errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            radius="md"
            type={isConfirmVisible ? "text" : "password"}
            validate={(value) => {
              if (value !== formData.password) {
                return "Passwords do not match.";
              }
            }}
            value={formData.confirmPassword}
            variant="bordered"
            onChange={handleChange}
          />
          <RoleSelection
            selectedRole={formData.role}
            onRoleChange={handleRoleChange}
          />
          {registrationMessage && (
            <Card
              className={`p-3 flex items-start gap-3 rounded-xl border shadow-md ${
                registrationMessage.type === "success"
                  ? "bg-green-300 border-green-600 text-green-900"
                  : "bg-red-300 border-red-600 text-red-900"
              }`}
            >
              {registrationMessage.type === "success" ? (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-6 h-6 text-green-800 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold">
                        {isEmailConfirmed
                          ? "Registration complete!"
                          : "Registration almost complete!"}
                      </h3>
                      <p className="text-sm">
                        {isEmailConfirmed
                          ? "Redirecting to the login page..."
                          : "Check your email for a confirmation link."}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-800 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold">
                        An error occurred!
                      </h3>
                      <p className="text-sm">We are working on this issue.</p>
                    </div>
                  </div>
                </>
              )}
            </Card>
          )}
          <Button
            className="w-full mt-2"
            color="primary"
            isLoading={isLoading}
            type="submit"
            onClick={handleSubmit}
          >
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
        <p className="text-center text-small pb-4">
          Already have an account?&nbsp;
          <Link as={RouterLink} size="sm" to={ROUTES.LOGIN}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
