import { createContext, Dispatch, SetStateAction } from 'react';

type StateAction<Type> = {
  state: Type;
  actions: {
    setState: Dispatch<SetStateAction<Type>>;
  };
};

function createContextInstance<Type>(initialization: Type) {
  return createContext<StateAction<Type>>({
    state: initialization,
    actions: { setState: () => {} },
  });
}

export default createContextInstance;
