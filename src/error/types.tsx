import { Dispatch, SetStateAction } from 'react';

export type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

export type ErrorRecord = {
  records: ErrorReport[];
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

export type NextJsError = Error & { digest?: string };
