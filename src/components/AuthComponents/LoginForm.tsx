"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Form,
  Divider,
  Card,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { jwtDecode } from "jwt-decode";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { FacebookIcon2, Logo, XCircleIcon } from "@/components/icons";
import useAuth from "@/hooks/useAuth";
import { errorToast } from "@/types/toast";
import { axiosPrivate } from "@/api/axios";
import { ROUTES } from "@/constants/Routes";

interface LoginRequest {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { setAuth, persist, togglePersist } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post("/Auth/Login", data);

      const { accessToken } = response.data;

      const userAuth = {
        accessToken,
        email: jwtDecode<{ email: string }>(accessToken).email,
        id: jwtDecode<{ nameid: string }>(accessToken).nameid,
      };

      setAuth(userAuth);

      navigate(ROUTES.TRAINERS);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo size={60} />
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Log in to your account to continue
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            isRequired
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            {...register("email", { required: "Email is required" })}
            errorMessage={errors.email?.message}
            validate={(value) => {
              if (!value.match(/^\S+@\S+\.\S+$/)) {
                return "Please enter a valid email address";
              }
            }}
          />
          <Input
            isRequired
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
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            {...register("password", { required: "Password is required" })}
            errorMessage={errors.password?.message}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters long.";
              }
            }}
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox
              checked={persist}
              name="remember"
              size="sm"
              onChange={togglePersist}
            >
              Remember me
            </Checkbox>
            <Link
              as={RouterLink}
              className="text-default-500"
              size="sm"
              to={ROUTES.FORGOT_PASSWORD}
            >
              Forgot password?
            </Link>
          </div>
          {errorMessage && (
            <Card className="p-3 flex items-start gap-3 rounded-xl border shadow-md bg-red-300 border-red-600 text-red-900 w-full">
              <div className="flex items-center space-x-2">
                <XCircleIcon className="w-6 h-6 text-red-800 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold">
                    An error occurred!
                  </h3>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              </div>
            </Card>
          )}
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            Sign In
          </Button>
        </Form>
        <p className="text-center text-small pb-4">
          Need to create an account?&nbsp;
          <Link as={RouterLink} size="sm" to={ROUTES.SIGNUP}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
