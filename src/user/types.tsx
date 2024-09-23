import { Dispatch, SetStateAction } from 'react';

type UidState = {
  username: string;
};

type Uid = UidState & {
  setUid: Dispatch<SetStateAction<UidState>>;
  setState: (data: UidState, username: string) => void;
};

export type { UidState, Uid };
