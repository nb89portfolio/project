"use client";

import { ErrorReportsContext } from "@/src/error/context";
import { ErrorReport, ErrorReports, NextError } from "@/src/error/types";
import Main from "@/src/main/component";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import reportError from "@/src/error/action";

function defineError(error: NextError) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  const stack = isStackDefined
    ? (error.stack as string)
    : "Stack is undefined.";

  const isDigestDefined = error.digest !== undefined;

  const digest = isDigestDefined
    ? (error.digest as string)
    : "Digest undefined.";

  return { name, message, stack, digest } as ErrorReport;
}

function handleError(
  report: ErrorReport,
  { errorReports, setState }: ErrorReports,
  setStatusState: Dispatch<SetStateAction<string>>
) {
  const duplicates = errorReports.find((errorReport) => {
    return (
      report.name === errorReport.name &&
      report.message === errorReport.message &&
      report.stack === errorReport.stack &&
      report.digest === errorReport.digest
    );
  });

  const hasDuplciate = duplicates !== undefined;

  if (hasDuplciate) {
    setStatusState("Error has already been reported.");
  } else {
    setState([...errorReports, report]);

    reportError(report)
      .then((response) => {
        setStatusState(response);
      })
      .catch((error) => {
        const isError = error instanceof Error;

        if (isError) {
          const { name, message, stack } = defineError(error as Error);

          setStatusState(`Message: [${name}] ${message}. ${stack}`);
        } else {
          setStatusState(
            "Unknown error occured when client tries to report error to server."
          );
        }
      });
  }
}

export default function Error({
  error,
  reset,
}: {
  error: NextError;
  reset: () => void;
}) {
  const title = "Fatal Error";

  const definedError = defineError(error);

  const { name, message, stack } = definedError;

  const errorState = useContext(ErrorReportsContext);

  const [state, setState] = useState<string>("");

  useEffect(() => {
    handleError(definedError, errorState, setState);
  }, [definedError, errorState]);

  return (
    <Main title={title}>
      <h3>{name}</h3>
      <p>{message}</p>
      <button onClick={() => reset()}>Reset Error</button>
      <output>{state}</output>
      <details>{stack}</details>
    </Main>
  );
}
