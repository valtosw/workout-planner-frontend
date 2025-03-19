import { useNavigate } from "react-router-dom";

import { StatusPageTemplate } from "../StatusPages/StatusPageTemplate";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <StatusPageTemplate
      action="Go back"
      description="You are not authorized to view this page."
      status="401"
      title="Unauthorized"
      onActionClick={() => navigate(-1)}
    />
  );
}
