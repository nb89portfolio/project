'use client';

import { ReactNode, useEffect, useState } from 'react';


import ErrorRecordContext from './context';
import getClientCache from '../cache/get';
import setClientCache from '../cache/set';
import { ErrorReport } from './types';
import UseUid from '../user/user';

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
  const [records, setRecords] = useState<ErrorReport[]>([]);

  const { username } = UseUid();

  useEffect(() => {
    const data = getClientCache<ErrorReport[], []>('error', username, []);

    setRecords(data);
  }, [username]);

  useEffect(() => {
    setClientCache('error', username, records, 24);
  }, [records, username]);

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
