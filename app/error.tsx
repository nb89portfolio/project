'use client';

import { NextJsError } from '@/src/error/types';
import styles from './page.module.css';
import UseErrorContext from '@/src/error/use';

export default function Error({
  error,
  reset,
}: {
  error: NextJsError;
  reset: () => void;
}) {
  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <UseErrorContext error={error}></UseErrorContext>
    </main>
  );
}
