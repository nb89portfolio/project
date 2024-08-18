"use client";

import {
  Dispatch,
  ErrorInfo,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import ErrourBoundaryFallback from "./fallback";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryAction from "./actions";
import { UserContextHandler, User } from "../user";

type ErrorDetails = {
  name: String;
  message: String;
  stack: string;
};

function getErrorDefinition(error: Error) {
  const name = error.name;
  const message = error.message;

  const isStackDefined = error.stack !== undefined;
  const stack = isStackDefined
    ? (error.stack as string)
    : "Error stack is undefined.";

  return { name, message, stack };
}

function determineInfoProperties(info: ErrorInfo, key: keyof ErrorInfo) {
  const isDefined = info[key] !== undefined;

  if (isDefined) {
    const isNotNull = info[key] !== null;

    if (isNotNull) {
      return info[key];
    }

    return `Error ${key} is null.`;
  }

  return `Error ${key} is undefined.`;
}

function getErrorInfoDefinitions(info: ErrorInfo) {
  const componentStack = determineInfoProperties(info, "componentStack");
  const digest = determineInfoProperties(info, "digest");

  return {
    componentStack,
    digest,
  };
}

function onError(
  error: Error,
  info: ErrorInfo,
  errors: ErrorDetails[],
  setErrors: Dispatch<SetStateAction<ErrorDetails[]>>,
  setStatus: Dispatch<SetStateAction<string>>,
  user: User
) {
  const definedError = getErrorDefinition(error);
  const definedInfo = getErrorInfoDefinitions(info);

  const getDuplicates = errors.find((error) => {
    return (
      error.name === definedError.name &&
      error.message === definedError.message &&
      error.stack === definedError.stack
    );
  });

  const hasDuplicate = getDuplicates !== undefined;

  if (hasDuplicate) {
    setStatus("Error has already been reported.");
  } else {
    setErrors([...errors, definedError]);

    ErrorBoundaryAction(definedError, definedInfo, user.uid)
      .then((repsonse) => {})
      .catch((error) => {});
  }
}

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
) {
  console.log(details);
}

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [errors, setErrors] = useState<ErrorDetails[]>([]);
  const [status, setStatus] = useState<string>("");

  const user = UserContextHandler();

  return (
    <ErrorBoundary
      FallbackComponent={(error, resetErrorBoundary) =>
        ErrourBoundaryFallback({ error, resetErrorBoundary })
      }
      onError={(error, info) =>
        onError(error, info, errors, setErrors, setStatus, user)
      }
      onReset={(details) => onReset(details)}
    >
      {children}
    </ErrorBoundary>
  );
}
