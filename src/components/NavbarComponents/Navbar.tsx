import { useLocation } from "react-router-dom";

import { AuthorizedNavbar } from "./AuthorizedNavbar";
import { UnauthorizedNavbar } from "./UnauthorizedNavbar";

import useAuth from "@/hooks/useAuth";

export const Navbar = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth ? (
    <AuthorizedNavbar key={location.pathname} />
  ) : (
    <UnauthorizedNavbar />
  );
};
