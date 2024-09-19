import { Dispatch, SetStateAction } from 'react';
import { ClientCacheKeys } from './types';
import getClientCache from './get';

export default function handleContextCache<State>(
  key: ClientCacheKeys,
  username: string,
  defaultData: State,
  setState: Dispatch<SetStateAction<State>>
) {
  const data = getClientCache<State>(key, username, defaultData);

  setState(data);
}
