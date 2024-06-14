"use client";

import { useErrorBoundary } from "react-error-boundary";

export default function ThrowError() {
  const { showBoundary } = useErrorBoundary();

  const newError = new Error("test");

  return <button onClick={() => showBoundary(newError)}>Throw error</button>;
}
