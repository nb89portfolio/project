'use client';

import { ReactNode, useEffect, useState } from 'react';
import getClientCache from '../cache/get';
import setClientCache from '../cache/set';
import { ErrorReport } from './types';
import UseUid from '../user/use';
import ErrorRecordContext from './context';

export default function ErrorRecordProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [records, setRecords] = useState<ErrorReport[]>([]);

  const { username } = UseUid();

  useEffect(() => {
    const data = getClientCache<ErrorReport[], []>('error', username, []);

    console.log('test', data);

    setRecords(data);
  }, [username]);

  useEffect(() => {
    setClientCache('error', username, records, 24);
  }, [records, username]);

  return (
    <ErrorRecordContext.Provider value={{ records, setRecords }}>
      {children}
    </ErrorRecordContext.Provider>
  );
}
