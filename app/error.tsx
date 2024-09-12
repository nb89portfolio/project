'use client';

import {
  ErrorRecordContext,
  ErrorReport,
  NextJSError,
} from '@/src/error/provider';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { UidContext } from '@/src/user/provider';
import reportErrorRecord from '@/src/error/action';
import clientCache from '@/src/cache/provider';

function defineErrorDefinition(error: NextJSError) {
  const { name, message } = error;

  const hasStack = error.stack !== undefined;

  const stack = hasStack ? (error.stack as string) : 'Stack is undefined.';

  const hasDigest = (error.digest as keyof NextJSError) !== undefined;

  const digest = hasDigest ? (error.digest as string) : 'Digest is undefined';

  return { name, message, stack, digest } as ErrorReport;
}

function handleError(
  error: NextJSError,
  records: ErrorReport[],
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
  const report = defineErrorDefinition(error);

  const { name, message, stack, digest } = report;

  const cache = clientCache.get<ErrorReport[], []>('error', username, []);

  const isCacheNull = cache.length === 0;

  const isRecordsNull = records.length === 0;

  const isCacheValid = isCacheNull > isRecordsNull;

  const updatedRecords = isCacheValid ? cache : records;

  const foundRecord = updatedRecords.find((record) => {
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
    const newRecord = [...updatedRecords, report];

    clientCache.set<ErrorReport[]>('error', username, newRecord, 24);

    setRecords(newRecord);

    reportErrorRecord(report, username)
      .then((response) => {
        const isString = typeof response.data === 'string';

        if (isString) {
          setStatus(response.data);
        } else {
          setStatus('Failed to report error from server to database.');
        }
      })
      .catch((newError) => {
        setStatus('Failed to report error from client to server.');
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
