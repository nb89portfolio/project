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
import reportErrorRecord from './action';
import { RebuiltError } from './classes';
import defineReport from './define';
import UseUidContext from '../user/use';
import getClientCache from '@/src/cache/get';
import setClientCache from '@/src/cache/set';

function handleError(
  error: NextJsError,
  errors: ErrorRecord,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
  const records = getClientCache<ErrorReport[]>(
    'error',
    username,
    errors.records
  );

  console.log('old', errors.records, 'new', records);

  const report = defineReport(error);

  const { setRecords } = errors;

  const foundDuplicates = records.find((record) => {
    return (
      report.name === record.name &&
      report.message === record.message &&
      report.stack === record.stack &&
      report.digest === record.digest
    );
  });

  const hasNoDuplicates = foundDuplicates === undefined;

  if (hasNoDuplicates) {
    const newRecords = [...records, report];

    setClientCache<ErrorReport[]>('error', username, newRecords, 24);

    setRecords(newRecords);

    reportErrorRecord(report, username)
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
  });

  return <output>{state}</output>;
}
