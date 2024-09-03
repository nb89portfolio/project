'use client';

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import reportErrorRecord from './action';
import { NextJSError, ErrorDefinition } from './types';
import ErrorRecordContext from './context';
import UseUID from '../user/user';

function defineErrorStack(error: Error) {
  const hasStack = error.stack !== undefined;

  const stack = hasStack ? (error.stack as string) : 'Stack is undefined.';

  return stack;
}

function defineErrorDigest(error: Error) {
  const assertError = error as NextJSError;

  const hasDigest = (assertError.digest as keyof NextJSError) !== undefined;

  const digest = hasDigest
    ? (assertError.digest as string)
    : 'Digest is undefined';

  return digest;
}

function defineError(error: NextJSError | unknown) {
  const hasError = error instanceof Error;

  if (!hasError) {
    const name = 'Unknown Error.';
    const message = 'Error is unknown.';
    const stack = 'Stack is unknown.';
    const digest = 'Digest cannot be provided.';

    return { name, message, stack, digest } as ErrorDefinition;
  }

  const { name, message } = error;

  const stack = defineErrorStack(error);

  const digest = defineErrorDigest(error);

  return { name, message, stack, digest } as ErrorDefinition;
}

function findDuplicateErrorRecord(
  report: ErrorDefinition,
  records: ErrorDefinition[]
) {
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
  records: ErrorDefinition[],
  setRecords: Dispatch<SetStateAction<ErrorDefinition[]>>,
  setStatus: Dispatch<SetStateAction<string>>,
  username: string
) {
  const report = defineError(error);

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

  const { username } = UseUID();

  useEffect(() => {
    reportError(error, records, setRecords, setStatus, username);
  }, [error, records, setRecords, username]);

  return <output>{status}</output>;
}
