"use client";

function defineError(error: Error) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  const stack = isStackDefined ? error.stack : "Stack is undefined";

  return { name, message, stack };
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { name, message, stack } = defineError(error);

  return (
    <html>
      <body>
        <h2>System Error</h2>
        <h3>{name}</h3>
        <p>{message}</p>
        <button onClick={() => reset()}>Reset Error</button>
        <details>{stack}</details>
      </body>
    </html>
  );
}
