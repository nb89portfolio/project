import { NextJsError } from '@/app/error';
import { ErrorReport } from './context';

class RebuildError extends Error {
  name: string;
  message: string;
  stack: string;
  digest: string;

  constructor(name: string, message: string, stack: string, digest: string) {
    super(message);

    this.name = name;
    this.message = message;
    this.stack = stack;
    this.digest = digest;

    Object.setPrototypeOf(this, RebuildError.prototype);
  }
}

export function defineErrorReport(error: unknown | NextJsError) {
  const isError = error instanceof Error;

  if (isError) {
    const { name, message } = error;

    const isStackDefined = error;

    const stack = isStackDefined ? error.stack : 'Stack is undefined.';

    return { name, message, stack } as ErrorReport;
  }

  return {
    name: 'Error name is unknown.',
    message: 'Error message is unknown.',
    stack: 'Error stack is unknown.',
    digest: 'Error name is unknown.',
  } as ErrorReport;
}

export function rebuildError(report: ErrorReport) {
  const { name, message, stack, digest } = report;

  return new RebuildError(name, message, stack, digest);
}
