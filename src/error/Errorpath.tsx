import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Dashboard from "../pages/dashboard";

function ErrorFallback({ error }: FallbackProps) {
  return <div>Something went wrong: {error instanceof Error ? error.message : "An error occurred"}</div>;
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Dashboard />
</ErrorBoundary>