'use client';

import { ReactNode, useState } from 'react';


import { UidState } from './types';
import UidContext from './context';

export default function UidProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  return (
    <UidContext.Provider value={{ ...uid, setUid }}>
      {children}
    </UidContext.Provider>

  );
}
