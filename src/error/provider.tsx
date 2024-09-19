'use client';

import { ReactNode, useEffect, useState } from 'react';
import ErrorRecordContext from './context';
import { ErrorReport } from './types';
import handleErrorCache from './handleCache';
import UseUidContext from '../user/use';

export default function ErrorRecordProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [records, setRecords] = useState<ErrorReport[]>([]);

  const [status, setStatus] = useState<string>('');

  const uid = UseUidContext();

  useEffect(() => {
    handleErrorCache(uid.username, setRecords);
  }, []);

  return (
    <ErrorRecordContext.Provider
      value={{ records, setRecords, status, setStatus }}>
      {children}
    </ErrorRecordContext.Provider>
  );
}
