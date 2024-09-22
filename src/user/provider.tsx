'use client';

import { ReactNode, useState, useEffect } from 'react';
import UidContext from './context';
import { UidState } from './types';
import getClientCache from '../cache/get';
import setClientCache from '../cache/set';

function UidProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  useEffect(() => {
    getClientCache<UidState>('user', uid.username, { username: '' }, setUid);
  }, []);

  return (
    <UidContext.Provider value={{ ...uid, setUid, setState: setClientCache }}>
      {children}
    </UidContext.Provider>
  );
}

export default UidProvider;
