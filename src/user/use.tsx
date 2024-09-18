'use client';

import { useContext } from 'react';
import UidContext from './cache';

export default function UseUidContext() {
  const uid = useContext(UidContext);

  return uid;
}
