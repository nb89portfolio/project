'use client';

import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from 'react';
import UseUid from '../user/user';
import reportErrorRecord from './action';
import ErrorRecordContext from './context';
import { ErrorReport, NextJSError } from './types';

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

  const { name, message } = error;

  const stack = defineErrorStack(error);

  const digest = defineErrorDigest(error);

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

function reportError(
  error: NextJSError | unknown,
  records: ErrorReport[],
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
  const report = defineErrorDefinition(error);

  const foundDuplicate = findDuplicateErrorRecord(report, records);

  if (foundDuplicate) {
    setStatus('Error has already been reported.');
  } else {
    const newRecord = [...records, report];

    setRecords(newRecord);

    reportErrorRecord(report, username)
      .then((response) => {
        const isString = typeof response === 'string';

        if (isString) {
          setStatus(response);
        } else {
          setStatus('Failed to report error from server to database.');
          reportError(response, records, setRecords, setStatus, username);
        }
      })
      .catch((newError) => {
        setStatus('Failed to report error from client to server.');
        reportError(newError, records, setRecords, setStatus, username);
      });
  }
}

export default function UseErrorRecord({
  error,
}: {
  error: NextJSError | unknown;
}) {
  const [status, setStatus] = useState<string>('');

  const { records, setRecords } = useContext(ErrorRecordContext);

  const { username } = UseUid();

  useEffect(() => {
    reportError(error, records, setRecords, setStatus, username);
  }, [error, records, setRecords, username]);

  return <output>{status}</output>;
}
