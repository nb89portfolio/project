'use client';

import { ErrorRecordContext, ErrorReport } from '@/src/error/provider';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { UidContext } from '@/src/user/provider';
import reportErrorRecord from '@/src/error/action';
import clientCache from '@/src/cache/provider';

export type NextJsError = Error & { digest?: string };

function defineReport(error: NextJsError) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  const stack = isStackDefined
    ? (error.stack as string)
    : 'Stack is undefined.';

  const isDigestDefined = error.digest !== undefined;

  const digest = isDigestDefined
    ? (error.digest as string)
    : 'Digest is undefined.';

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
  report: ErrorReport,
  records: ErrorReport[],
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
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
        const isString = typeof response === 'string';

        if (isString) {
          setStatus(response);
        } else {
          setStatus('Server failed to submit error report.');

          handleError(response, records, setRecords, setStatus, username);
        }
      })
      .catch((error) => {
        setStatus('Client failed to submit error report.');

        const isError =
          error instanceof TypeError ||
          error instanceof SyntaxError ||
          error instanceof RangeError ||
          error instanceof ReferenceError;

        if (isError) {
          const report = defineReport(error);

          handleError(report, records, setRecords, setStatus, username);
        }

        const report: ErrorReport = {
          name: 'Error name unknown.',
          message: 'Error message unknown.',
          stack: 'Error stack unknown.',
          digest: 'Error digest unknown.',
        };

        handleError(report, records, setRecords, setStatus, username);
      });
  }
}

export default function Error({
  error,
  reset,
}: {
  error: NextJsError;
  reset: () => void;
}) {
  const errorState = useContext(ErrorRecordContext);

  const { records, setRecords, setStatus } = errorState;

  const uid = useContext(UidContext);

  const { username } = uid;

  const report = defineReport(error);

  useEffect(() => {
    handleError(report, records, setRecords, setStatus, username);
  }, []);

  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <output>{errorState.status}</output>
    </main>
  );
}
