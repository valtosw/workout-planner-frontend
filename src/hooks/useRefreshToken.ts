import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthData } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/Auth/RefreshAccessToken",
      {},
      {
        withCredentials: true,
      }
    );
    console.log("New Token:", response.data.accessToken);
    setAuth((prev: AuthData | null) => {
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
  };
  return refresh;
};

export default useRefreshToken;