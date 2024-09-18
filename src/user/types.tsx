import { Dispatch, SetStateAction } from 'react';

export type UidState = {
  username: string;
};

export type Uid = UidState & {
  setUid: Dispatch<SetStateAction<UidState>>;
};
