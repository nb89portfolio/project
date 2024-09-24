import { Dispatch, SetStateAction } from 'react';

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

type NextJsError = Error & { digest?: string };

export type { ErrorReport, ErrorRecord, NextJsError };
