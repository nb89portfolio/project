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
import getClientCache from '../cache/get';
import setClientCache from '../cache/set';

function getCachedData(
  username: string,
  currentData: UidState,
  setState: Dispatch<SetStateAction<UidState>>
) {
  const data = getClientCache<UidState>('user', username, currentData);

  setState(data);
}

function UidProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  function setCachedData(data: UidState, username: string) {
    setClientCache<UidState>('user', username, data, 1);

    setUid(data);
  }

  useEffect(() => {
    getCachedData(uid.username, uid, setUid);
  }, []);

  return (
    <UidContext.Provider value={{ ...uid, setUid, setState: setCachedData }}>
      {children}
    </UidContext.Provider>
  );
}

export default UidProvider;
