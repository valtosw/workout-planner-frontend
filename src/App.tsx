import { Route, Routes } from "react-router-dom";

import TrainersPage from "@/pages/trainers";
import SignupPage from "@/pages/signup";
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import WorkoutPlansPage from "@/pages/workout-plans";
import { ROUTES } from "@/constants/routes";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<TrainersPage />} path={ROUTES.TRAINERS} />
      <Route element={<WorkoutPlansPage />} path={ROUTES.WORKOUT_PLANS} />
      <Route element={<SignupPage />} path={ROUTES.SIGNUP} />
      <Route element={<LoginPage />} path={ROUTES.LOGIN} />
    </Routes>
  );
}

export default App;
