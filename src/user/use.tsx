'use client';

import { useContext } from 'react';
import UidContext from './context';

export function UseUidContext() {
  const uid = useContext(UidContext);

  return uid;
}
