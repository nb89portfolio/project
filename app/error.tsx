'use client';

import { UseUidContext } from '@/src/user/context';
import styles from './page.module.css';
import {
  ErrorRecords,
  ErrorReport,
  UseErrorRecordContext,
} from '@/src/error/context';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { reportError } from '@/src/error/action';
import { RebuildError } from '@/src/error/class';

type NextJsError = Error & { digest?: string };

function buildReport(error: NextJsError) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  const stack = isStackDefined ? (error.stack as string) : 'Stack is undefined';

  const isDigestDefined = error.digest !== undefined;

  const digest = isDigestDefined
    ? (error.digest as string)
    : 'Digest is undefined.';

  return { name, message, stack, digest } as ErrorReport;
}

function findDuplicate(report: ErrorReport, records: ErrorReport[]) {
  return records.find((record) => {
    return (
      record.name === report.name &&
      record.message === report.message &&
      record.stack === report.stack &&
      record.digest === report.digest
    );
  }) as ErrorReport | undefined;
}

function validateError(variable: any): variable is Error {
  return (
    typeof variable === 'object' &&
    variable !== null &&
    'message' in variable &&
    'name' in variable
  );
}

function throwRebuiltError(report: ErrorReport) {
  const { name, message, stack, digest } = report;

  const rebuiltError = new RebuildError(name, message, stack, digest);

  throw rebuiltError;
}

function handleError(
  username: string,
  error: NextJsError,
  errorRecords: ErrorRecords,
  setStatus: Dispatch<SetStateAction<string>>
) {
  const report = buildReport(error);

  const hasDuplicateReport = findDuplicate(report, errorRecords.state.records);

  const isDuplicateReport = hasDuplicateReport !== undefined;

  if (isDuplicateReport) {
    setStatus('Error has already been reported');
  } else {
    const data = { records: [...errorRecords.state.records, report] };

    errorRecords.actions.setRecords(data);

    reportError(report, username)
      .then((response) => {
        const isString = typeof response === 'string';

        if (isString) {
          setStatus(response);
        } else {
          throwRebuiltError(response);
        }
      })
      .catch((error) => {
        const isError = validateError(error);

        if (isError) {
          throw error;
        } else {
          const report: ErrorReport = {
            name: 'Error name is unknown.',
            message: 'Error message is unknown.',
            stack: 'Error stack is unknown.',
            digest: 'Error name is unknown.',
          };

          throwRebuiltError(report);
        }
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
  const uid = UseUidContext();
  const errorRecords = UseErrorRecordContext();

  const [status, setStatus] = useState<string>('Processing.');

  useEffect(() => {
    handleError(uid.state.username, error, errorRecords, setStatus);
  }, []);

  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <output>{status}</output>
    </main>
  );
}
