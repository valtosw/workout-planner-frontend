import { createContext, useState, ReactNode, FC, useEffect } from "react";

import axiosPrivate from "../api/axios";
import { log } from "console";
export interface AuthData {
  accessToken: string;
  id: string;
  email: string;
}

export interface UserData {
  fullName: string;
  profilePicture: string;
}

export interface AuthContextType {
  auth: AuthData | null;
  user: UserData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  persist: boolean;
  togglePersist: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [persist, setPersist] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("persist") || "false");
  });

  const togglePersist = () => {
    const newPersist = !persist;

    setPersist(newPersist);
    localStorage.setItem("persist", newPersist ? "true" : "false");
  };

  const logout = async () => {
    try {
      await axiosPrivate.post("/Auth/Logout", {}, { withCredentials: true });
      setAuth(null);
      setUser(null);
      console.log("Logged out");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Auth:", auth);
      if (auth?.id) {
        try {
          const response = await axiosPrivate.get(
            `/ApplicationUser/${auth.id}`,
          );

          console.log("User data:", response.data);
          setUser(response.data);
        } catch (err: any) {
          if (err.response?.status === 401) {
            logout();
          }
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, user, setAuth, setUser, persist, togglePersist, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
