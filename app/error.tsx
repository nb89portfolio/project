'use client';

import { NextJSError } from '@/src/error/types';
import UseErrorRecord from '@/src/error/use';
import UseMain from '@/src/main/provider';

export default function Error({
  error,
  reset,
}: {
  error: NextJSError;
  reset: () => void;
}) {
  const title = 'Fatal Error';

  return (
    <UseMain title={title}>
      <UseErrorRecord error={error}></UseErrorRecord>
      <button onClick={reset}>Reset Error</button>
    </UseMain>
  );
}
