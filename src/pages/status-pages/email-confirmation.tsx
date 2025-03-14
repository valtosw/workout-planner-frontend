import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { LoadingPage } from "./loading-page";
import { StatusPageTemplate } from "./status-page-template";

import axios from "@/api/axios";

function useQuery() {
  const location = useLocation();

  return useMemo(() => new URLSearchParams(location.search), [location]);
}

export const EmailConfirmationPage = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const query = useQuery();
  const requestMade = useRef(false);

  useEffect(() => {
    const email = query.get("email");
    const code = query.get("code");

    if (email && code && !requestMade.current) {
      requestMade.current = true;

      axios
        .post(
          "/Auth/ConfirmEmail",
          JSON.stringify({ Email: email, Code: code }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        )
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          setSuccess(false);
        });
    } else if (!email || !code) {
      setSuccess(false);
    }
  }, [query]);

  return (
    <>
      {success === null ? (
        <LoadingPage />
      ) : (
        <StatusPageTemplate
          description={
            success ? "You may close this window now." : "Please try again."
          }
          status={success ? "Success" : "Error"}
          title={success ? "Email Confirmed" : "Email Confirmation Failed"}
        />
      )}
    </>
  );
};
