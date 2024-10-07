'use client';

import { UseUidContext } from '@/src/user/context';
import styles from './page.module.css';
import { ErrorReport, UseErrorContext } from '@/src/error/context';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { reportError } from '@/src/error/action';
import { defineErrorReport, rebuildError } from '@/src/error/handler';

export type NextJsError = Error & { digest?: string };

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

function handleError(
  username: string,
  error: NextJsError,
  errorRecords: ErrorReport[],
  setRecords: (data: { records: ErrorReport[] }) => void,
  setStatus: Dispatch<SetStateAction<string>>
) {
  const report = defineErrorReport(error);

  const hasDuplicateReport = findDuplicate(report, errorRecords);

  const isDuplicateReport = hasDuplicateReport !== undefined;

  if (isDuplicateReport) {
    setStatus('Error has already been reported');
  } else {
    const data = { records: [...errorRecords, report] };

    setRecords(data);

    reportError(report, username)
      .then((response) => {
        const isString = typeof response === 'string';

        if (isString) {
          setStatus(response);
        } else {
          const newError = rebuildError(response);

          throw newError;
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

          const newError = rebuildError(report);

          throw newError;
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
  const errorRecords = UseErrorContext();

  const [status, setStatus] = useState<string>('Processing.');

  useEffect(() => {
    handleError(
      uid.username,
      error,
      errorRecords.records,
      errorRecords.setRecords,
      setStatus
    );
  }, []);

  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <output>{status}</output>
    </main>
  );
}
