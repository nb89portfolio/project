'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ErrorDefinition } from './types';
import ErrorRecordContext from './context';
import getCache from '../cache/get';
import setCache from '../cache/set';

export default function ErrorRecordProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [records, setRecords] = useState<ErrorDefinition[]>([]);

  useEffect(() => {
    const data = getCache<ErrorDefinition[], []>('error', []);

    setRecords(data);
  }, []);

  useEffect(() => {
    setCache('error', records, 24);
  }, [records]);

  return (
    <ErrorRecordContext.Provider value={{ records, setRecords }}>
      {children}
    </ErrorRecordContext.Provider>
  );
}
