'use client';

import { UseUidContext } from '@/src/user/context';
import styles from './page.module.css';
import { ErrorReport, UseErrorRecordContext } from '@/src/error/context';
import { useEffect, useState } from 'react';
import { reportError } from '@/src/error/action';
import { RebuildError } from '@/src/error/class';

type NextJsError = Error & { digest?: string };

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
    const { name, message } = error;

    const isStackDefined = error.stack !== undefined;

    const stack = isStackDefined
      ? (error.stack as string)
      : 'Stack is undefined';

    const isDigestDefined = error.digest !== undefined;

    const digest = isDigestDefined
      ? (error.digest as string)
      : 'Digest is undefined.';

    const report: ErrorReport = { name, message, stack, digest };

    const hasDuplicateReport = errorRecords.state.records.find((record) => {
      return (
        record.name === report.name &&
        record.message === report.message &&
        record.stack === report.stack &&
        record.digest === report.digest
      );
    });

    const isDuplicateReport = hasDuplicateReport !== undefined;

    if (isDuplicateReport) {
      setStatus('Error has already been reported');
    } else {
      const data = { records: [...errorRecords.state.records, report] };

      errorRecords.actions.setRecords(data);

      reportError(report, uid.state.username)
        .then((response) => {
          const isString = typeof response === 'string';

          if (isString) {
            setStatus(response);
          } else {
            const { name, message, stack, digest } = response as ErrorReport;

            const rebuiltError = new RebuildError(name, message, stack, digest);

            throw rebuiltError;
          }
        })
        .catch((error) => {
          const isError =
            error instanceof SyntaxError ||
            error instanceof TypeError ||
            error instanceof ReferenceError ||
            error instanceof EvalError ||
            error instanceof RangeError ||
            error instanceof URIError;

          if (isError) {
            throw error;
          } else {
            const report: ErrorReport = {
              name: 'Error name is unknown.',
              message: 'Error message is unknown.',
              stack: 'Error stack is unknown.',
              digest: 'Error name is unknown.',
            };

            const { name, message, stack, digest } = report;

            const rebuiltError = new RebuildError(name, message, stack, digest);

            throw rebuiltError;
          }
        });
    }
  }, []);

  return (
    <main className={styles.main}>
      <h2>Fatal Error</h2>
      <button onClick={reset}>Reset Error</button>
      <output>{status}</output>
    </main>
  );
}
