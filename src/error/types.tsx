import { Dispatch, SetStateAction } from 'react';

type NextJSError = Error & { digest?: string };

type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

type ErrorRecord = {
  records: ErrorReport[];
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>;
};

export type { NextJSError, ErrorReport, ErrorRecord };
