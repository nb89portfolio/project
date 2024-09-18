'use client';

import { ReactNode, useEffect, useState } from 'react';
import UidContext from './context';
import { UidState } from './types';
import handleUidCache from './handle';

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
