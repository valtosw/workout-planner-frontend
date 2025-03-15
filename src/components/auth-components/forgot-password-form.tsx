import { Input, Card, Button, Link } from "@heroui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Logo, CheckCircleIcon, XCircleIcon } from "../icons";

import { ROUTES } from "@/constants/routes";
import axios from "@/api/axios";

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState<ForgotPasswordRequest>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validate = (): boolean => {
    return formData.email.match(/^\S+@\S+\.\S+$/) ? true : false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSubmitMessage(null);

    try {
      const response = await axios.post<ForgotPasswordResponse>(
        "/Auth/ForgotPassword",
        formData,
      );

      setSubmitMessage({
        type: "success",
        message: response.data.message || "Password reset link sent to email.",
      });
      setFormData({
        email: "",
      });
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 10000);
    } catch (error: any) {
      setSubmitMessage({
        type: "error",
        message: error.response?.data?.message || "Something went wrong.",
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
          <p className="text-xl font-medium">Forgot password?</p>
          <p className="text-small text-default-500">
            No worries, we will send you a reset link to restore it.
          </p>
        </div>

        <form className="flex flex-col gap-3">
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
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
            variant="bordered"
            onChange={handleChange}
          />
          {submitMessage && (
            <Card
              className={`p-3 flex items-start gap-3 rounded-xl border shadow-md ${
                submitMessage.type === "success"
                  ? "bg-green-300 border-green-600 text-green-900"
                  : "bg-red-300 border-red-600 text-red-900"
              }`}
            >
              {submitMessage.type === "success" ? (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-6 h-6 text-green-800 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold">
                        The link has been sent!
                      </h3>
                      <p className="text-sm">
                        Check your email for the reset link.
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
            Send Reset Link
          </Button>
        </form>
        <p className="text-center text-small">
          Back to&nbsp;
          <Link as={RouterLink} size="sm" to={ROUTES.LOGIN}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
