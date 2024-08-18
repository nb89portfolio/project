import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type UserState = { uid: string };

export type User = UserState & {
  setState: Dispatch<SetStateAction<UserState>>;
};

const initialUid = "";

const UserContext = createContext<User>({
  uid: initialUid,
  setState: () => {},
});

export default function UserWrapper({ children }: { children: ReactNode }) {
  const [{ uid }, setState] = useState<UserState>({ uid: initialUid });

  return (
    <UserContext.Provider value={{ uid, setState }}>
      {children}
    </UserContext.Provider>
  );
}
