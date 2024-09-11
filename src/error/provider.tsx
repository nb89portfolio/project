'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export type NextJSError = Error & { digest?: string };

export type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

type ErrorRecord = {
  records: ErrorReport[];
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

export const ErrorRecordContext = createContext<ErrorRecord>({
  records: [],
  setRecords: () => {},
  status: '',
  setStatus: () => {},
});

export default function ErrorRecordProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [records, setRecords] = useState<ErrorReport[]>([]);

  const [status, setStatus] = useState<string>('');

  return (
    <ErrorRecordContext.Provider
      value={{ records, setRecords, status, setStatus }}>
      {children}
    </ErrorRecordContext.Provider>
  );
}
