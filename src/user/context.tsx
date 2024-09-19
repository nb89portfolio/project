import { createContext } from 'react';
import { Uid } from './types';

const UidContext = createContext<Uid>({
  username: 'testing',
  setUid: () => {},
  setState: () => {},
});

export default UidContext;
