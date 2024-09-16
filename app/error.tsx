'use client';

import { ErrorRecordContext, ErrorReport } from '@/src/error/provider';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { UidContext } from '@/src/user/provider';
import reportErrorRecord from '@/src/error/actions';
import clientCache from '@/src/cache/provider';
import NextJSError from '@/src/error/class';

function defineErrorReport(error: NextJSError | unknown): ErrorReport {
  const isError = error instanceof NextJSError;

  if (!isError) {
    const name = 'Error name is undeifned.';
    const message = 'Error message is undefined.';
    const stack = 'Error stack is undefined.';
    const digest = 'Error digest is undefined.';

    return { name, message, stack, digest } as ErrorReport;
  }

  const { name, message } = error;

  const hasStack = error.stack !== undefined;

  const stack = hasStack ? (error.stack as string) : 'Stack is undefined.';

  const hasDigest = (error.digest as keyof NextJSError) !== undefined;

  const digest = hasDigest ? (error.digest as string) : 'Digest is undefined';

  return { name, message, stack, digest } as ErrorReport;
}

function handleCache(username: string, records: ErrorReport[]): ErrorReport[] {
  const cache = clientCache.get<ErrorReport[], []>('error', username, []);

  const isCacheUndefined = cache === undefined;

  const isCacheNull = isCacheUndefined ? 0 : cache.length;

  const isRecordsNull = records.length;

  const isCacheValid = isCacheNull > isRecordsNull;

  const usuableRecords = isCacheValid ? (cache as ErrorReport[] | []) : records;

  return usuableRecords as ErrorReport[];
}

function handleError(
  error: NextJSError,
  records: ErrorReport[],
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
  const report = defineErrorReport(error);

  const { name, message, stack, digest } = report;

  const usuableRecords = handleCache(username, records);

  const foundRecord = usuableRecords.find((record) => {
    return (
      record.name === name &&
      record.message === message &&
      record.stack === stack &&
      record.digest == digest
    );
  });

  const hasDuplicate = foundRecord !== undefined;

  if (hasDuplicate) {
    setStatus('Error has already been reported.');
  } else {
    const newRecord = [...usuableRecords, report];

    clientCache.set<ErrorReport[]>('error', username, newRecord, 24);

    setRecords(newRecord);

    reportErrorRecord(report, username)
      .then((response) => {
        const data = response.data;

        const isString = typeof data === 'string';

        if (isString) {
          setStatus(data);
        } else {
          setStatus('Server failed to submit error report.');

          const { name, message, stack, digest } = data;

          const newError = new NextJSError(name, message, stack, digest);

          handleError(newError, records, setRecords, setStatus, username);
        }
      })
      .catch((error) => {
        setStatus('Client failed to submit error report.');

        const { name, message, stack, digest } = defineErrorReport(error);

        const newError = new NextJSError(name, message, stack, digest);

        handleError(newError, records, setRecords, setStatus, username);
      });
  }
}

export default function Error({
  error,
  reset,
}: {
  error: NextJSError;
  reset: () => void;
}) {
  const errorState = useContext(ErrorRecordContext);

  const { records, setRecords, setStatus } = errorState;

  const uid = useContext(UidContext);

  const { username } = uid;

  useEffect(() => {
    handleError(error, records, setRecords, setStatus, username);
  }, []);

  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <output>{errorState.status}</output>
    </main>
  );
}
