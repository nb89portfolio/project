import { Dispatch, SetStateAction } from "react";

export type NextError = Error & { digest?: string };

export type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

export type ErrorReports = {
  errorReports: ErrorReport[];
  setState: Dispatch<SetStateAction<ErrorReport[]>>;
};
