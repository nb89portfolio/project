import { FallbackProps } from "react-error-boundary";
import ResetErrorButton from "./reset";

type Props = FallbackProps & { status: string };

function defineError(error: any) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  const name = isError ? error.name : "Name is unknown.";
  const message = isError ? error.message : "Message is unknown.";

  if (isError) {
    const isStackDefined = error.stack !== undefined;

    const stack = isStackDefined
      ? (error.stack as string)
      : "Stack is undefined.";

    return { name, message, stack };
  }

  const stack = "Stack is unknown.";

  return { name, message, stack };
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
