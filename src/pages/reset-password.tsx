import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Input, Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

import { axiosPrivate } from "@/api/axios";
import { Logo } from "@/components/icons";
import { CheckCircleIcon, XCircleIcon } from "@/components/icons";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface ResetPasswordRequest {
  password: string;
  confirmPassword?: string;
}

interface ResetPasswordResponse {
  message: string;
}

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState<ResetPasswordRequest>({
    password: "",
    confirmPassword: "",
  });

  const query = useQuery();
  const email = query.get("email");
  const code = query.get("code");
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const validate = (): boolean => {
    if (formData.password.length < 8) {
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      return false;
    }

    return true;
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
      const response = await axiosPrivate.post<ResetPasswordResponse>(
        "/Auth/ResetPassword",
        { Email: email, Code: code, NewPassword: formData.password },
      );


      setSubmitMessage({
        type: "success",
        message: response.data.message || "Password reset successful.",
      });
      sessionStorage.setItem("passwordResetSuccess", "true");
      setIsChanged(true);
      setFormData({
        password: "",
        confirmPassword: "",
      });
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
          <p className="text-xl font-medium">Reset Password</p>
          <p className="text-small text-default-500">
            Enter a new password to change your password.
          </p>
        </div>

        <form className="flex flex-col gap-3">
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
            label="New Password"
            name="password"
            placeholder="Enter your new password"
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
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm your new password"
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
                        Your password has been reset!
                      </h3>
                      <p className="text-sm">
                        You may close this window now and log in with your new
                        password.
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
            isDisabled={isChanged}
            isLoading={isLoading}
            type="submit"
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
