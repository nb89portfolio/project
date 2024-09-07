'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ErrorDefinition } from './types';
import ErrorRecordContext from './context';
import getClientCache from '../cache/get';
import setClientCache from '../cache/set';
import UseUID from '../user/user';

export default function ErrorRecordProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [records, setRecords] = useState<ErrorDefinition[]>([]);

  const uid = UseUID();

  const user = uid.username;

  useEffect(() => {
    const data = getClientCache<ErrorDefinition[], []>('error', user, []);

    setRecords(data);
  }, [user]);

  useEffect(() => {
    setClientCache('error', user, records, 24);
  }, [records, user]);

  return (
    <ErrorRecordContext.Provider value={{ records, setRecords }}>
      {children}
    </ErrorRecordContext.Provider>
  );
}
