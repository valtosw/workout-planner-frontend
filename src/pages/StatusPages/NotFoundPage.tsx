import { useNavigate } from "react-router-dom";

import { StatusPageTemplate } from "../StatusPages/StatusPageTemplate";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <StatusPageTemplate
      action="Go back"
      description="The page you are looking for does not exist."
      status="404"
      title="Page not found"
      onActionClick={() => navigate(-1)}
    />
  );
}
