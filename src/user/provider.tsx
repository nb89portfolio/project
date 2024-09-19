'use client';

import {
  ReactNode,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import UidContext from './context';
import { UidState } from './types';
import handleContextCache from '../cache/context';

function setUid(data: UidState, setState: Dispatch<SetStateAction<UidState>>) {
  setClient;

  setState(data);
}

export default function UidProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  useEffect(() => {
    handleContextCache<UidState>('user', uid.username, uid, setUid);
  }, []);

  return (
    <UidContext.Provider value={{ ...uid, setUid }}>
      {children}
    </UidContext.Provider>
  );
}
