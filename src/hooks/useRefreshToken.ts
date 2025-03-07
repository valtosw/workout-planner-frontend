import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";

import axios from "../api/axios";
import { AuthData } from "../context/AuthProvider";

import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const response = await axios.post(
        "/Auth/RefreshAccessToken",
        {},
        { withCredentials: true },
      );

      console.log("New Token:", response.data.accessToken);

      setAuth((prev: AuthData | null) => {
        if (!response.data.accessToken) {
          console.error("No access token received from refresh.");

          return prev;
        }

        return {
          ...prev,
          accessToken: response.data.accessToken,
          email:
            prev?.email ||
            jwtDecode<{ email: string }>(response.data.accessToken).email,
          id:
            prev?.id ||
            jwtDecode<{ nameid: string }>(response.data.accessToken).nameid,
        };
      });

      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);

      return null; 
    }
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
