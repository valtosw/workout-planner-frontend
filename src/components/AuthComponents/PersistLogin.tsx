import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { LoadingPage } from "../../pages/StatusPages/LoadingPage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    console.log("Persist:", persist);
  console.log("Auth Token:", auth?.accessToken);

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, persist, refresh]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <LoadingPage /> : <Outlet />}</>
  );
};

export default PersistLogin;
