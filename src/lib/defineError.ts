export type DefinedError = {
  name: string;
  message: string;
  stack: string;
};

export function defineError(error: unknown) {
  const isError = error instanceof Error;

  if (isError) {
    const { name, message } = error;

    const hasStack = error.stack !== undefined;

    if (hasStack) {
      const stack = hasStack ? (error.stack as string) : 'Undefined.';

      return { name, message, stack };
    }
  }

  const name = 'Unknown';
  const message = 'Unknown';
  const stack = 'Unknown';

  return { name, message, stack };
}
