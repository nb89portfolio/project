'use client';

import { NextJSError } from '@/src/error/types';
import UseErrorRecord from '@/src/error/use';
import Main from '@/src/main/component';

export default function Error({
  error,
  reset,
}: {
  error: NextJSError;
  reset: () => void;
}) {
  const title = 'Fatal Error';

  return (
    <Main title={title}>
      <UseErrorRecord error={error}></UseErrorRecord>
      <button onClick={reset}>Reset Error</button>
    </Main>
  );
}
