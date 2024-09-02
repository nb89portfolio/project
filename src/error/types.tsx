import { Dispatch, SetStateAction } from "react";

type NextJSError = Error & { digest?: string };

type ErrorDefinition = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

type ErrorRecord = {
  records: ErrorDefinition[];
  setRecords: Dispatch<SetStateAction<ErrorDefinition[]>>;
};

export type { NextJSError, ErrorDefinition, ErrorRecord };
