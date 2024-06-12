"use client";

import { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <main>
      <h2></h2>
      <p></p>
      <details></details>
      <button>Reset Error</button>
    </main>
  );
}

function onError(error: any, info: ErrorInfo) {}

function onReset(
  details:
    | {
        reason: "imperative-api";
        args: any[];
      }
    | {
        reason: "keys";
        prev: any[] | undefined;
        next: any[] | undefined;
      }
) {}

export default function Error({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
}
