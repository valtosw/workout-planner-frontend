import { addToast } from "@heroui/react";

export const errorToast = (message: string) => {
  return addToast({
    color: "danger",
    title: "Error",
    description: message,
    radius: "md",
    timeout: 1500,
    shouldShowTimeoutProgess: true,
  });
};

export const successToast = (message: string) => {
  return addToast({
    color: "success",
    title: "Success",
    description: message,
    radius: "md",
    timeout: 1500,
    shouldShowTimeoutProgess: true,
  });
};
