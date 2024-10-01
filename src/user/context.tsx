'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { getLocalStorage, setLocalStorage } from '../cache/localstorage';

type UidState = {
  username: string;
};

type UidActions = {
  setUid: (data: UidState) => void;
};

type Uid = {
  state: UidState;
  actions: UidActions;
};

const initializeState: UidState = {
  username: '',
};

const initializeUid: Uid = {
  state: initializeState,
  actions: {
    setUid: () => {},
  },
};

export const UidContext = createContext<Uid>(initializeUid);

export function UidContextProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>(() => {
    const cache = getLocalStorage<UidState>('', 'user');

    const isValid = cache !== null;

    if (isValid) {
      return cache;
    } else {
      return initializeState;
    }
  });

  return (
    <UidContext.Provider
      value={{
        state: uid,
        actions: {
          setUid: (data: UidState) => {
            setLocalStorage<UidState>(uid.username, 'user', data, 1);
            setUid(data);
          },
        },
      }}>
      {children}
    </UidContext.Provider>
  );
}

export function UseUidContext() {
  const uid = useContext(UidContext);

  return uid;
}
