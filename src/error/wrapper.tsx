"use client";

import {
  Dispatch,
  ErrorInfo,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./fallback";
import errorAction from "./action";

type Props = {
  children: ReactNode;
};

export type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  componentStack: string;
  digest: string;
};

function buildError(error: Error) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  if (isStackDefined) {
    const stack = error.stack as string;

    return { name, message, stack };
  }

  const stack = "Stack is undefined.";

  return { name, message, stack };
}

function buildErrorInfoProperty(info: ErrorInfo, key: keyof ErrorInfo) {
  const isDefined = info[key] !== undefined;

  if (!isDefined) {
    return `Error ${key} is undefined.`;
  }

  const isNull = info[key] === null;

  if (isNull) {
    return `Error ${key} is null.`;
  }

  return info[key] as string;
}

function buildReport(error: Error, info: ErrorInfo) {
  const { name, message, stack } = buildError(error);
  const componentStack = buildErrorInfoProperty(info, "componentStack");
  const digest = buildErrorInfoProperty(info, "digest");

  return { name, message, stack, componentStack, digest } as ErrorReport;
}

function findDuplicate(newReport: ErrorReport, reports: ErrorReport[]) {
  return reports.find((report) => {
    const nameMatch = report.name === newReport.name;
    const messageMatch = report.message === newReport.message;
    const stackMatch = report.stack === newReport.stack;
    const componentStackMatch =
      report.componentStack === newReport.componentStack;
    const digestMatch = report.digest === newReport.digest;

    return (
      nameMatch &&
      messageMatch &&
      stackMatch &&
      componentStackMatch &&
      digestMatch
    );
  });
}

function buildFatalErrorMessage(error: unknown) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  if (isError) {
    const { name, message, stack } = buildError(error);

    return `Fatal error calling server error action:\n${name}\n${message}\n${stack}`;
  }

  return "Fatal error calling server error action is unknown.";
}

function onError(
  error: Error,
  info: ErrorInfo,
  reports: ErrorReport[],
  setReports: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>
) {
  const newReport = buildReport(error, info);

  const duplicateReport = findDuplicate(newReport, reports);

  const isDuplicateDefined = duplicateReport !== undefined;

  if (isDuplicateDefined) {
    setStatus("Error has already been reported.");
  } else {
    const newReportList = [...reports, newReport];

    setReports(newReportList);

    errorAction(newReport)
      .then((response) => {
        setStatus(response);
      })
      .catch((error) => {
        const status = buildFatalErrorMessage(error);

        setStatus(status);
      });
  }
}

export default function ErrorWrapper({ children }: Props) {
  const [status, setStatus] = useState<string>("");
  const [reports, setReports] = useState<ErrorReport[]>([]);

  return (
    <ErrorBoundary
      FallbackComponent={(error, resetErrorBoundary) =>
        ErrorFallback({ error, resetErrorBoundary, status })
      }
      onError={(error, info) =>
        onError(error, info, reports, setReports, setStatus)
      }
    >
      {children}
    </ErrorBoundary>
  );
}
