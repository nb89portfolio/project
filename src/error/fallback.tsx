import { FallbackProps } from "react-error-boundary";
import ResetErrorButton from "./reset";

type Props = FallbackProps & { status: string };

type FallbackError = {
  name: string;
  message: string;
  stack: string;
};

function defineError(error: any) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  if (!isError) {
    const name = "Name is unknown.";
    const message = "Message is unknown.";
    const stack = "Stack is unknown.";

    return { name, message, stack } as FallbackError;
  }

  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  if (!isStackDefined) {
    const stack = "Stack is undefined.";

    return { name, message, stack } as FallbackError;
  }

  const stack = error.stack as string;

  return { name, message, stack } as FallbackError;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  status,
}: Props) {
  const { name, message, stack } = defineError(error);

  return (
    <main>
      <h2>Error</h2>
      <p>An error has occured and is being submitted.</p>
      <p>Name: {name}</p>
      <p>Message: {message}</p>
      <details>
        <summary>Stack:</summary>
        <p>{stack}</p>
      </details>
      <output>{status}</output>
      <ResetErrorButton
        resetErrorBoundary={resetErrorBoundary}
      ></ResetErrorButton>
    </main>
  );
}
