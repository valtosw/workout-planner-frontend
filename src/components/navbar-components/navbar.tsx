import { useLocation } from "react-router-dom";

import { AuthorizedNavbar } from "./authorized-navbar";
import { UnauthorizedNavbar } from "./unauthorized-navbar";

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
