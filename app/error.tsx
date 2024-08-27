"use client";

import Main from "@/src/main/component";
import { useEffect } from "react";

function defineError(error: Error) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  const stack = isStackDefined ? error.stack : "Stack is undefined";

  return { name, message, stack };
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const title = "Fatal Error";

  const { name, message, stack } = defineError(error);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Main title={title}>
      <h3>{name}</h3>
      <p>{message}</p>
      <button onClick={() => reset()}>Reset Error</button>
      <details>{stack}</details>
    </Main>
  );
}
