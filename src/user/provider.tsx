'use client';

import { ReactNode, useState } from 'react';
import UidContext from './context';
import { UidState } from './types';

function UidContextProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  return (
    <UidContext.Provider value={{ ...uid, setUid }}>
      {children}
    </UidContext.Provider>
  );
}

export default UidContextProvider;
