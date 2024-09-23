'use client';

import { createContext } from 'react';
import { ErrorRecord } from './types';

const ErrorContext = createContext<ErrorRecord>({
  records: [],
  setRecords: () => {},
});

export default ErrorContext;
