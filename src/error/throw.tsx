"use client";

import { useErrorBoundary } from "react-error-boundary";

type Props = {
  message?: string;
};

export default function ThrowError({
  message = "Test closest error boundary.",
}: Props) {
  const { showBoundary } = useErrorBoundary();

  const error = new Error(message);

  return <button onClick={() => showBoundary(error)}>Throw error</button>;
}
