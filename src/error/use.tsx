'use client';

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import ErrorContext from './context';
import { ErrorRecord, ErrorReport, NextJsError } from './types';
import reportErrorRecord from './refactor/action';
import { RebuiltError } from './classes';
import defineReport from './define';
import UseUidContext from '../user/use';

function handleError(
  error: NextJsError,
  errors: ErrorRecord,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
  const report = defineReport(error);

  const { records, setRecords } = errors;

  const foundDuplicates = records.find((record) => {
    return (
      report.name === record.name &&
      report.message === record.message &&
      report.stack === record.stack &&
      report.digest === record.digest
    );
  });

  const hasNoDuplicate = foundDuplicates === null;

  if (hasNoDuplicate) {
    setRecords([...records, report], username);

    reportErrorRecord(report)
      .then((response) => {
        const isString = typeof response === 'string';

        if (isString) {
          setStatus(response);
        } else {
          const { name, message, stack, digest } = response;

          const error = new RebuiltError(name, message, stack, digest);

          throw error;
        }
      })
      .catch((error) => {
        const isError = error instanceof Error;

        if (isError) {
          handleError(error, errors, setStatus, username);
        } else {
          setStatus(
            'Fatal error on from client to server has occured while trying to report an error. This application is currently broken. Please come back later.'
          );
        }
      });
  } else {
    setStatus('Error has already been reported.');
  }
}

export default function UseErrorContext({ error }: { error: NextJsError }) {
  const [state, setStatus] = useState<string>('');

  const errors = useContext(ErrorContext);

  const uid = UseUidContext();

  useEffect(() => {
    handleError(error, errors, setStatus, uid.username);
  }, []);

  return <output>{state}</output>;
}
