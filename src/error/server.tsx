'use server';

import NextJSError from './class';
import { ErrorReport } from './provider';

export default async function handleServerError(error: unknown) {
  const isError = error instanceof Error;

  if (isError) {
    const { name, message } = error;

    const hasStack = error.stack !== undefined;

    const stack = hasStack ? (error.stack as string) : 'Stack is undefined.';

    const assetError = error as NextJSError;

    const hasDigest = assetError.digest !== undefined;

    const digest = hasDigest
      ? (assetError.digest as string)
      : 'Digest is undefined';

    return { name, message, stack, digest } as ErrorReport;
  }

  const name = 'Error name is undeifned.';
  const message = 'Error message is undefined.';
  const stack = 'Error stack is undefined.';
  const digest = 'Error digest is undefined.';

  return { name, message, stack, digest } as ErrorReport;
}
