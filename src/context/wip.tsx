'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export default function ContextWrapper<Data>({ data }: { data: Data }) {
  const Context = createContext<{
    state: Data;
    setState: Dispatch<SetStateAction<Data>>;
  }>({ state: data, setState: () => {} });

  function Provider({ children, data }: { children: ReactNode; data: Data }) {
    const [state, setState] = useState<Data>(data);

    return (
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    );
  }

  function Use() {
    const context = useContext(Context);

    return context;
  }

  return { Context, Provider, Use };
}
