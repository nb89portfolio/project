'use client';

import { ReactNode, useState } from 'react';

import ErrorContext from './context';
import { ErrorReport } from './types';

function ErrorContextProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<ErrorReport[]>([]);

  return (
    <ErrorContext.Provider value={{ records, setRecords }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContextProvider;
