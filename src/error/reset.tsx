"use client";

type Props = {
  resetErrorBoundary: (...args: any[]) => void;
};

export default function ResetErrorButton({ resetErrorBoundary }: Props) {
  return <button onClick={() => resetErrorBoundary()}>Reset Error</button>;
}
