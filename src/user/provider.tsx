'use client';

import {
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import getClientCache from '../cache/get';
import UidContext from './context';
import { UidState } from './types';

function handleUidCache(
  username: string,
  setUid: Dispatch<SetStateAction<UidState>>
) {
  const data = getClientCache<UidState, UidState>('user', username, {
    username: '',
  });

  setUid(data);
}

export default function UidProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  useEffect(() => {
    handleUidCache(uid.username, setUid);
  }, []);

  return (
    <UidContext.Provider value={{ ...uid, setUid }}>
      {children}
    </UidContext.Provider>
  );
}
