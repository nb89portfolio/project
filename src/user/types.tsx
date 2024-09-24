import { Dispatch, SetStateAction } from 'react';

type UidState = {
  username: string;
};

type Uid = UidState & {
  setUid: Dispatch<SetStateAction<UidState>>;
};

export type { UidState, Uid };
