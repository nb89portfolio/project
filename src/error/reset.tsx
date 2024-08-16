"use client";

export default function ErrorBoundaryReset({
  resetErrorBoundary,
}: {
  resetErrorBoundary: (...args: any[]) => void;
}) {
  return <button onClick={resetErrorBoundary}>Reset Error</button>;
}
