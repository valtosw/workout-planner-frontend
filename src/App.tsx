import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import React from "react";

import { UnauthorizedPage } from "./pages/StatusPages/UnauthorizedPage";
import PersistLogin from "./components/AuthComponents/PersistLogin";
import ForCustomerPage from "./test/for-customer";
import ProtectedRoute from "./components/AuthComponents/ProtectedRoute";
import ForTrainerPage from "./test/for-trainer";
import { EmailConfirmationPage } from "./pages/StatusPages/EmailConfirmation";
import ProfilePage from "./pages/Profile";
import { EditTrainerProfile } from "./components/ProfileComponents/EditTrainerProfile";
import ProgressLoggingPage from "./pages/ProgressLogging";
import CreateWorkoutPlanPage from "./pages/CreateWorkoutPlan";

import { LoadingPage } from "@/pages/StatusPages/LoadingPage";
import { NotFoundPage } from "@/pages/StatusPages/NotFoundPage";
import TrainersPage from "@/pages/Trainers";
import IndexPage from "@/pages/index";
import WorkoutPlansPage from "@/pages/WorkoutPlans";
import { ROUTES } from "@/constants/Routes";

const SignupPage = React.lazy(() => import("@/pages/SignUp"));
const LoginPage = React.lazy(() => import("@/pages/Login"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPasswordPage = React.lazy(() => import("@/pages/ResetPassword"));

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
          <Route
            element={<ProtectedRoute allowedRoles={["Customer", "Trainer"]} />}
          >
            <Route element={<ProfilePage />} path={ROUTES.PROFILE} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
            <Route
              element={<ProgressLoggingPage />}
              path={ROUTES.PROGRESS_LOGGING}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Trainer"]} />}>
            <Route
              element={<EditTrainerProfile />}
              path={ROUTES.EDIT_TRAINER_PROFILE}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Trainer"]} />}>
            <Route element={<ForTrainerPage />} path="/for-trainer" />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["Customer", "Trainer"]} />}
          >
            <Route element={<WorkoutPlansPage />} path={ROUTES.WORKOUT_PLANS} />
            <Route element={<TrainersPage />} path={ROUTES.TRAINERS} />
            <Route
              element={<CreateWorkoutPlanPage />}
              path={ROUTES.CREATE_WORKOUT_PLAN}
            />
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
