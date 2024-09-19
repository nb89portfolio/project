import { Dispatch, SetStateAction } from 'react';
import { ClientCacheKeys } from '../cache/types';

type UidState = {
  username: string;
};

type Uid = UidState & {
  setUid: Dispatch<SetStateAction<UidState>>;
  setState: <DataType>(
    key: ClientCacheKeys,
    user: string,
    data: DataType,
    limit: number,
    setState: Dispatch<SetStateAction<DataType>>
  ) => void;
};

export type { UidState, Uid };
