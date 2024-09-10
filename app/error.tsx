'use client';

import { NextJSError } from '@/src/error/types';
import UseErrorRecord from '@/src/error/use';
import styles from './page.module.css';

export default function Error({
  error,
  reset,
}: {
  error: NextJSError;
  reset: () => void;
}) {
  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <UseErrorRecord error={error}></UseErrorRecord>
      <button onClick={reset}>Reset Error</button>
    </main>
  );
}
