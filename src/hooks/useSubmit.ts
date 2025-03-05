import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

import useErrorHandler from "./useErrorHandler";

interface Request<T = unknown> {
  url: string;
  data: object;
  redirect?: string;
  onSuccess?: (response: T) => void;
  onError?: (message: string) => void;
}

const useSubmit = () => {
  const navigate = useNavigate();
  const { parse } = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const submit = async <T = unknown>({
    url,
    data,
    redirect,
    onSuccess,
    onError,
  }: Request<T>) => {
    setLoading(true);

    try {
      const response = await axios.post<T>(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      if (redirect) {
        navigate(redirect);
      }
    } catch (err: unknown) {
      if (onError) {
        onError(parse(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};

export default useSubmit;
