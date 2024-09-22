'use client';

import { useContext } from 'react';
import UidContext from './context';

function UseUidContext() {
  const uid = useContext(UidContext);

  return uid;
}

export default UseUidContext;
