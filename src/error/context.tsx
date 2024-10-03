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
import { UseUidContext } from '../user/context';

export type ErrorReport = {
  name: string;
  message: string;
  stack: string;
  digest: string;
};

type State = { records: ErrorReport[] };

type Actions = {
  setRecords: (data: State) => void;
};

type ErrorContext = State & Actions;

const initializeState: State = { records: [] };

const initializeErrorRecord: ErrorContext = {
  ...initializeState,
  setRecords: (data) => {},
};

const Context = createContext<ErrorContext>(initializeErrorRecord);

function getCachedState(username: string) {
  const cache = getLocalStorage<State>(username, 'user');

  const isValid = cache !== null;

  return isValid ? cache : initializeState;
}

function setCachedState(
  data: State,
  username: string,
  setState: Dispatch<SetStateAction<State>>
) {
  setLocalStorage<State>(username, 'user', data, 24);
  setState(data);
}

export function ErrorContextProvider({ children }: { children: ReactNode }) {
  const uid = UseUidContext();

  const [state, setState] = useState<State>(getCachedState(uid.username));

  return (
    <Context.Provider
      value={{
        ...state,
        setRecords: (data) => setCachedState(data, uid.username, setState),
      }}>
      {children}
    </Context.Provider>
  );
}

export function UseErrorContext() {
  const context = useContext(Context);

  return context;
}
