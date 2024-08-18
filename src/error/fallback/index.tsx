import { FallbackProps } from "react-error-boundary";
import ErrorBoundaryReset from "./reset";

function getErrorProperties(error: any) {
  const isError = error instanceof Error;

  const name = isError ? error.name : "Error name is unknown.";
  const message = isError ? error.message : "Error message is unknown.";

  const potentialStack = isError ? error.stack : "Error stack is unknown.";
  const isStackUndefined = potentialStack === undefined;
  const stack = isStackUndefined ? "Error stack is undefined." : potentialStack;

  return {
    name,
    message,
    stack,
  };
}

export default function ErrourBoundaryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps & {}) {
  const { name, message, stack } = getErrorProperties(error);

  return (
    <main>
      <h2>Error</h2>
      <h3>{name}</h3>
      <p>{message}</p>
      <details>{stack}</details>
      <ErrorBoundaryReset
        resetErrorBoundary={resetErrorBoundary}
      ></ErrorBoundaryReset>
    </main>
  );
}
