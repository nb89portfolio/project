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

type State = {
  username: string;
};

type Actions = {
  setUid: (data: State) => void;
};

type UidContext = State & Actions;

const initializeState: State = {
  username: '',
};

const initializeContext: UidContext = {
  ...initializeState,
  setUid: (data) => {},
};

const Context = createContext<State & Actions>(initializeContext);

function getCachedState() {
  const cache = getLocalStorage<State>('', 'user');

  const isValid = cache !== null;

  if (isValid) {
    return cache;
  } else {
    return initializeState;
  }
}

function setCachedState(
  data: State,
  username: string,
  setState: Dispatch<SetStateAction<State>>
) {
  setLocalStorage<State>(username, 'user', data, 1);
  setState(data);
}

export function UidContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(getCachedState());

  return (
    <Context.Provider
      value={{
        ...state,
        setUid: (data) => setCachedState(data, state.username, setState),
      }}>
      {children}
    </Context.Provider>
  );
}

export function UseUidContext() {
  const uid = useContext(Context);

  return uid;
}
