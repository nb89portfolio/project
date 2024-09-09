'use client';

import { useContext } from 'react';
import UserIdContext from './context';

export default function UseUID() {
  const uid = useContext(UserIdContext);

  return uid;
}
