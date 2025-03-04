import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import React from "react";

import { LoadingPage } from "@/pages/status-pages/loading-page";
import { NotFoundPage } from "@/pages/status-pages/not-found-page";
import TrainersPage from "@/pages/trainers";
import IndexPage from "@/pages/index";
import WorkoutPlansPage from "@/pages/workout-plans";
import { ROUTES } from "@/constants/routes";

const SignupPage = React.lazy(() => import("@/pages/signup"));
const LoginPage = React.lazy(() => import("@/pages/login"));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<TrainersPage />} path={ROUTES.TRAINERS} />
        <Route element={<WorkoutPlansPage />} path={ROUTES.WORKOUT_PLANS} />
        <Route element={<SignupPage />} path={ROUTES.SIGNUP} />
        <Route element={<LoginPage />} path={ROUTES.LOGIN} />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
}

export default App;
