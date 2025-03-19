import { StatusPageTemplate } from "./StatusPageTemplate";

export function LoadingPage() {
  return (
    <StatusPageTemplate
      description="Please wait while we load the page."
      status="Loading"
      title="Loading..."
    />
  );
}
