// "use client";
import { useState } from "react";
import { Button, Input, Checkbox, Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { RoleSelection } from "@/components/auth-components/role-selection";
import { Logo, FacebookIcon2 } from "@/components/icons";
import useFeedback from "@/hooks/useFeedback";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import axios from "@/api/axios";
import { Link as RouterLink } from "react-router-dom";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    if (!validate()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post<RegisterResponse>(
        "/Auth/Register",
        formData,
      );

      setSuccessMessage(
        response.data.message || "Registration successful! Please log in.",
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer",
      });
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.message || "Registration failed.",
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
            value={formData.confirmPassword}
            variant="bordered"
            onChange={handleChange}
          />
          <RoleSelection
            selectedRole={formData.role}
            onRoleChange={handleRoleChange}
          />
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
          {errors.general && <p className="text-red-500">{errors.general}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button
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
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link as={RouterLink} size="sm" to={ROUTES.LOGIN}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
