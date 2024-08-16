"use client";

import { ErrorInfo, ReactNode } from "react";
import ErrourBoundaryFallback from "./fallback";
import { ErrorBoundary } from "react-error-boundary";

type ImparativeDetails = {
  reason: "imperative-api";
  args: any[];
};

type KeysDetails = {
  reason: "keys";
  prev: any[] | undefined;
  next: any[] | undefined;
};

type Details = ImparativeDetails | KeysDetails;

function onError(error: Error, info: ErrorInfo) {}

function onReset(details: Details) {}

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={(error, resetErrorBoundary) =>
        ErrourBoundaryFallback({ error, resetErrorBoundary })
      }
      onError={() => {}}
      onReset={() => {}}
    >
      {children}
    </ErrorBoundary>
  );
}
