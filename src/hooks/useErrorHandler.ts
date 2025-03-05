import { isAxiosError } from "axios";

const useErrorHandler = () => {
  const parse = (error: unknown): string => {
    if (isAxiosError(error)) {
      return (
        error.response?.data?.message ||
        error.response?.data?.title ||
        error.response?.statusText ||
        error.message ||
        "An unexpected error occurred. Please try again."
      );
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "An unexpected error occurred. Please try again.";
    }
  };

  return { parse };
};

export default useErrorHandler;
