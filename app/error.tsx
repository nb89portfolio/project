'use client';

import {
  ErrorRecordContext,
  ErrorReport,
  NextJSError,
} from '@/src/error/provider';
import styles from './page.module.css';
import { Suspense, useContext, useEffect } from 'react';
import { UidContext } from '@/src/user/provider';
import reportErrorRecord from '@/src/error/action';

function defineErrorStack(error: Error) {
  const hasStack = error.stack !== undefined;

  const stack = hasStack ? (error.stack as string) : 'Stack is undefined.';

  return stack;
}

function defineErrorDigest(error: Error) {
  const assertedType = error as NextJSError;

  const hasDigest = (assertedType.digest as keyof NextJSError) !== undefined;

  const digest = hasDigest
    ? (assertedType.digest as string)
    : 'Digest is undefined';

  return digest;
}

function defineErrorDefinition(error: NextJSError | unknown) {
  const hasError = error instanceof Error;

  if (!hasError) {
    const name = 'Unknown Error.';
    const message = 'Error is unknown.';
    const stack = 'Stack is unknown.';
    const digest = 'Digest cannot be provided.';

    return { name, message, stack, digest } as ErrorReport;
  }

  const { name, message } = error as NextJSError;

  const stack = defineErrorStack(error as NextJSError);

  const digest = defineErrorDigest(error as NextJSError);

  return { name, message, stack, digest } as ErrorReport;
}

function findDuplicateErrorRecord(report: ErrorReport, records: ErrorReport[]) {
  const { name, message, stack, digest } = report;

  const foundRecord = records.find((record) => {
    return (
      record.name === name &&
      record.message === message &&
      record.stack === stack &&
      record.digest == digest
    );
  });

  const hasDuplicate = foundRecord !== undefined;

  return hasDuplicate;
}

export default function Error({
  error,
  reset,
}: {
  error: NextJSError;
  reset: () => void;
}) {
  const errorState = useContext(ErrorRecordContext);
  const uid = useContext(UidContext);

  useEffect(() => {
    const report = defineErrorDefinition(error);
    const foundDuplicate = findDuplicateErrorRecord(report, errorState.records);

    if (foundDuplicate) {
      errorState.setStatus('Error has already been reported.');
    } else {
      const newRecord = [...errorState.records, report];

      errorState.setRecords(newRecord);

      reportErrorRecord(report, uid.username)
        .then((response) => {
          const isString = typeof response.data === 'string';

          if (isString) {
            errorState.setStatus(response.data);
          } else {
            errorState.setStatus(
              'Failed to report error from server to database.'
            );
          }
        })
        .catch((newError) => {
          errorState.setStatus('Failed to report error from client to server.');
        });
    }
  }, [error, errorState, uid.username]);

  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <output>{errorState.status}</output>
    </main>
  );
}
