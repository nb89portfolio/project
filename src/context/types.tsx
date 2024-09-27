type StateAction<Type> = {
  state: Type;
  actions: {
    setState: Dispatch<SetStateAction<Type>>;
  };
};

export type { StateAction };
