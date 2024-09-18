'use client';

import { Dispatch, SetStateAction } from 'react';
import getClientCache from '../cache/get';
import { UidState } from './types';

export default function handleUidCache(
  username: string,
  setUid: Dispatch<SetStateAction<UidState>>
) {
  const data = getClientCache<UidState, UidState>('user', username, {
    username: '',
  });

  setUid(data);
}
