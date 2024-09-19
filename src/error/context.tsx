'use client';

import { createContext } from 'react';
import { ErrorRecord } from './types';

const ErrorRecordContext = createContext<ErrorRecord>({
  records: [],
  setRecords: () => {},
  status: '',
  setStatus: () => {},
});

export default ErrorRecordContext;
