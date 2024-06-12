"use client";

import {
  Dispatch,
  ErrorInfo,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import errorAction from "./errorAction";
import Fallback, { DefinedError } from "./fallback";

type DefinedErrorInfo = {
  componentStack: string;
  digest: string;
};

export type ErrorReport = DefinedError & DefinedErrorInfo;

function assignErrorInfoProperty(
  key: keyof ErrorInfo,
  state: "undefined" | "null"
) {
  return `Error info ${key} is ${state}.`;
}

function defineErrorInfoObject(info: ErrorInfo) {
  const hasComponentStack = info.componentStack !== undefined;

  const definedComponentStack = hasComponentStack
    ? info.componentStack
    : assignErrorInfoProperty("componentStack", "undefined");

  const isNotNullComponentStack =
    definedComponentStack !== null
      ? definedComponentStack
      : assignErrorInfoProperty("componentStack", "null");

  const hasDigest = info.digest !== undefined;

  const definedDigest = hasDigest
    ? info.digest
    : assignErrorInfoProperty("digest", "undefined");

  const isNotNullDigest =
    definedDigest !== null
      ? definedDigest
      : assignErrorInfoProperty("digest", "null");

  return {
    componentStack: isNotNullComponentStack,
    digest: isNotNullDigest,
  } as DefinedErrorInfo;
}

function findDuplicate(report: ErrorReport, reports: ErrorReport[]) {
  return reports.find((loggedReport) => {
    loggedReport.name === report.name &&
      loggedReport.message === report.message &&
      loggedReport.stack === report.stack &&
      loggedReport.componentStack === report.componentStack &&
      loggedReport.digest === report.digest;
  });
}

function createReport(
  report: ErrorReport,
  reports: ErrorReport[],
  setReports: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>
) {
  setReports([...reports, report]);

  errorAction(report)
    .then((response) => {
      setStatus(response);
    })
    .catch((error) => {
      const definedError = defineErrorObject(error);
      const { name, message, stack } = definedError;
      const response = `Error ${name}: ${message} (${stack})`;

      setStatus(response);
    });
}

function onError(
  error: any,
  info: ErrorInfo,
  reports: ErrorReport[],
  setReports: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>
) {
  const definedError = defineErrorObject(error);
  const defineErrorInfo = defineErrorInfoObject(info);
  const report = { ...definedError, ...defineErrorInfo } as ErrorReport;

  const foundDuplicate = findDuplicate(report, reports);

  const hasDuplicate = foundDuplicate !== undefined;

  hasDuplicate
    ? createReport(report, reports, setReports, setStatus)
    : setStatus("Error has already been reported.");
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
) {}

export default function ErrorWrapper({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<ErrorReport[]>([]);
  const [status, setStatus] = useState<string>("");

  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) =>
        onError(error, info, reports, setReports, setStatus)
      }
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
}
