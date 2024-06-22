"use client";

export default function ResetErrorButton({
  resetErrorBoundary,
}: {
  resetErrorBoundary: (...args: any[]) => void;
}) {
  return <button onClick={() => resetErrorBoundary()}>Reset Error</button>;
}
