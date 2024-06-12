"use client";

import { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type DefinedError = {
  name: string;
  message: string;
  stack: string;
};

function assignErrorObjectProperty(
  key: keyof Error,
  state: "unknown" | "undefined"
) {
  return `Error ${key} is ${state}.` as string;
}

function defineErrorObject(error: any) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  const name = isError
    ? error.name
    : assignErrorObjectProperty("name", "unknown");
  const message = isError
    ? error.message
    : assignErrorObjectProperty("message", "unknown");

  const stack = isError
    ? error.stack
    : assignErrorObjectProperty("stack", "unknown");

  const definedStack =
    stack !== undefined
      ? stack
      : assignErrorObjectProperty("stack", "undefined");

  return {
    name,
    message,
    stack: definedStack,
  } as DefinedError;
}

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  const { name, message, stack } = defineErrorObject(error);

  return (
    <main>
      <h2>{name}</h2>
      <p>{message}</p>
      <details>{stack}</details>
      <button onClick={() => resetErrorBoundary()}>Reset Error</button>
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

export default function ErrorWrapper({ children }: { children: ReactNode }) {
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
