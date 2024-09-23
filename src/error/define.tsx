import { ErrorReport, NextJsError } from './types';

function defineReport(error: NextJsError) {
  const { name, message } = error;

  const isUndefinedStack = error.stack === undefined;

  const stack = isUndefinedStack
    ? 'Stack is undefined.'
    : (error.stack as string);

  const isUndefinedDigest = error.digest === undefined;

  const digest = isUndefinedDigest
    ? 'Digest is undefined.'
    : (error.digest as string);

  return { name, message, stack, digest } as ErrorReport;
}

export default defineReport;
