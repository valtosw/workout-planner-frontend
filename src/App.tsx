import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import React from "react";

import { UnauthorizedPage } from "./pages/status-pages/unauthorized-page";
import PersistLogin from "./components/auth-components/persist-login";
import ForCustomerPage from "./test/for-customer";
import ProtectedRoute from "./components/auth-components/protected-route";
import ForTrainerPage from "./test/for-trainer";
import { EmailConfirmationPage } from "./pages/status-pages/email-confirmation";

import { LoadingPage } from "@/pages/status-pages/loading-page";
import { NotFoundPage } from "@/pages/status-pages/not-found-page";
import TrainersPage from "@/pages/trainers";
import IndexPage from "@/pages/index";
import WorkoutPlansPage from "@/pages/workout-plans";
import { ROUTES } from "@/constants/routes";

const SignupPage = React.lazy(() => import("@/pages/signup"));
const LoginPage = React.lazy(() => import("@/pages/login"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/forgot-password"));
const ResetPasswordPage = React.lazy(() => import("@/pages/reset-password"));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<UnauthorizedPage />} path={ROUTES.UNAUTHORIZED} />
        <Route element={<IndexPage />} path="/" />
        <Route element={<NotFoundPage />} path="*" />
        <Route element={<LoginPage />} path={ROUTES.LOGIN} />
        <Route element={<SignupPage />} path={ROUTES.SIGNUP} />
        <Route element={<ForgotPasswordPage />} path={ROUTES.FORGOT_PASSWORD} />
        <Route element={<ResetPasswordPage />} path={ROUTES.RESET_PASSWORD} />
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
            <Route element={<ForCustomerPage />} path="/for-customer" />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Trainer"]} />}>
            <Route element={<ForTrainerPage />} path="/for-trainer" />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["Customer", "Trainer"]} />}
          >
            <Route element={<WorkoutPlansPage />} path={ROUTES.WORKOUT_PLANS} />
            <Route element={<TrainersPage />} path={ROUTES.TRAINERS} />
          </Route>
        </Route>

        <Route
          element={<EmailConfirmationPage />}
          path={ROUTES.EMAIL_CONFIRMATION}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
