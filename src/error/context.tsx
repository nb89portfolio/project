'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../cache/localstorage';
import { UseUidContext } from '../user/context';

export type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

type ErrorRecordsState = { records: ErrorReport[] };

type ErrorRecordsAction = {
  setRecords: (data: ErrorRecordsState) => void;
};

export type ErrorRecords = {
  state: ErrorRecordsState;
  actions: ErrorRecordsAction;
};

const initializeState = { records: [] };

const initializeErrorRecord = {
  state: initializeState,
  actions: {
    setRecords: () => {},
  },
};

export const ErrorContext = createContext<ErrorRecords>(initializeErrorRecord);

export function ErrorRecordContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const uid = UseUidContext();

  const [records, setRecords] = useState<ErrorRecordsState>(() => {
    const cache = getLocalStorage<ErrorRecordsState>(
      uid.state.username,
      'error'
    );

    const isNotNull = cache !== null;

    if (isNotNull) {
      return cache;
    } else {
      return initializeState;
    }
  });

  return (
    <ErrorContext.Provider
      value={{
        state: records,
        actions: {
          setRecords: (data) => {
            setLocalStorage<ErrorRecordsState>(
              uid.state.username,
              'error',
              data,
              24
            );
            setRecords(data);
          },
        },
      }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function UseErrorRecordContext() {
  const context = useContext(ErrorContext);

  return context;
}
