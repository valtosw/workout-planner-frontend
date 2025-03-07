"use client";

import React, { useState } from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { jwtDecode } from "jwt-decode";
import { useForm, SubmitHandler } from "react-hook-form";

import { FacebookIcon2, Logo } from "@/components/icons";
import useAuth from "@/hooks/useAuth";
import { errorToast } from "@/types/toast";
import { axiosPrivate } from "@/api/axios";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

interface LoginRequest {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

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
      errorToast(error.response?.data?.message || "Login failed");
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
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            Sign In
          </Button>
        </Form>
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
            Continue with Google
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<FacebookIcon2 width={24} />}
            variant="bordered"
          >
            Continue with Facebook
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
