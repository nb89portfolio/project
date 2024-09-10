import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type UidState = {
  username: string;
};

type Uid = UidState & {
  setUid: Dispatch<SetStateAction<UidState>>;
};

export const UidContext = createContext<Uid>({
  username: '',
  setUid: () => {},
});

export default function UidProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<UidState>({ username: '' });

  return (
    <UidContext.Provider value={{ ...uid, setUid }}>
      {children}
    </UidContext.Provider>
  );
}
