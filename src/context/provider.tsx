import { Context, ReactNode, useState } from 'react';
import { StateAction } from './types';

function ContextProvider<Type>({
  children,
  initialization,
  Context,
}: {
  children: ReactNode;
  initialization: Type;
  Context: Context<StateAction<Type>>;
}) {
  const [state, setState] = useState<Type>(initialization);

  return (
    <Context.Provider value={{ state, actions: { setState } }}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
