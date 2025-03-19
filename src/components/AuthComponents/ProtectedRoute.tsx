import { useLocation, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../constants/Routes";

interface ProtectedRouteProps {
  allowedRoles: string[];
}
interface DecodedToken {
  role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken
    ? jwtDecode<DecodedToken>(auth.accessToken)
    : null;

  const role = decoded?.role || "";

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : auth?.id ? (
    <Navigate replace state={{ from: location }} to={ROUTES.UNAUTHORIZED} />
  ) : (
    <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />
  );
};

export default ProtectedRoute;
