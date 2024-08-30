"use client";

import { ErrorReport, ErrorRecords, NextJSError } from "@/src/error/types";
import Main from "@/src/main/component";
import { useContext, useEffect } from "react";
import reportError from "@/src/error/action";
import { ErrorRecordContext } from "@/src/error/context";

function defineError(error: NextJSError) {
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

function isDuplicate(report: ErrorReport, records: ErrorReport[]) {
  const foundDuplicate = records.find((record) => {
    return (
      report.name === record.name &&
      report.message === record.message &&
      report.stack === record.stack &&
      report.digest === record.digest
    );
  });

  const hasDuplicate = foundDuplicate !== undefined;

  return hasDuplicate as boolean;
}

function handleError(report: ErrorReport, errorState: ErrorRecords) {
  const { records, setRecords, setStatus } = errorState;

  const hasDuplciate = isDuplicate(report, records);

  if (hasDuplciate) {
    setStatus("Error has already been reported.");
  } else {
    setRecords([...records, report]);

    reportError(report)
      .then((response) => {
        setStatus(response);
      })
      .catch((error) => {
        const hasError = (error as Error).name !== undefined;

        if (hasError) {
          const { name, message, stack, digest } = defineError(error as Error);

          const newMessage = `${name}, ${message}, ${stack}, ${digest}`;

          setStatus(newMessage);
        } else {
          const message =
            "Unknown error occured when client tries to report error to server.";

          setStatus(message);
        }
      });
  }
}

export default function Error({
  error,
  reset,
}: {
  error: NextJSError;
  reset: () => void;
}) {
  const title = "Fatal Error";

  const definedError = defineError(error);

  const { name, message, stack } = definedError;

  const errorState = useContext(ErrorRecordContext);

  useEffect(() => {
    handleError(definedError, errorState);
  }, []);

  return (
    <Main title={title}>
      <h3>{name}</h3>
      <p>{message}</p>
      <button onClick={() => reset()}>Reset Error</button>
      <output>{errorState.status}</output>
      <details>{stack}</details>
    </Main>
  );
}
