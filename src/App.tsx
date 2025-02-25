import { Route, Routes } from "react-router-dom";

import TrainersPage from "@/pages/trainers";
import SignupPage from "@/pages/signup";
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<TrainersPage />} path="/trainers" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
}

export default App;
