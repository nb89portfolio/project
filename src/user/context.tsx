'use client';

import { createContext } from 'react';
import { Uid } from './types';

const UidContext = createContext<Uid>({
  username: '',
  setUid: () => {},
});

export default UidContext;
