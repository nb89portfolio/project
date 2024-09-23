'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import getClientCache from '@/src/cache/get';
import setClientCache from '@/src/cache/set';
import UseUidContext from '../user/use';
import ErrorContext from './context';
import { ErrorReport } from './types';

function getCachedData(
  username: string,
  currentData: ErrorReport[],
  setState: Dispatch<SetStateAction<ErrorReport[]>>
) {
  const data = getClientCache<ErrorReport[]>('error', username, currentData);

  setState(data);
}

function ErrorProvider({ children }: { children: ReactNode }) {
  function setCachedData(data: ErrorReport[], username: string) {
    setClientCache<ErrorReport[]>('error', username, data, 24);

    setRecords(data);
  }

  const [records, setRecords] = useState<ErrorReport[]>([]);

  const uid = UseUidContext();

  useEffect(() => {
    getCachedData(uid.username, records, setRecords);
  }, []);

  return (
    <ErrorContext.Provider value={{ records, setRecords: setCachedData }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;
