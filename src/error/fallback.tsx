import { FallbackProps } from "react-error-boundary";
import ResetErrorButton from "./reset";

function defineError(error: any) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  if (isError) {
    const { name, message } = error;

    const isStackDefined = error.stack !== undefined;

    if (isStackDefined) {
      const { stack } = error;

      return { name, message, stack };
    }

    const stack = "Stack is undefined.";

    return { name, message, stack };
  }

  const name = "Name is unknown.";
  const message = "Message is unknown.";
  const stack = "Stack is unknown.";

  return { name, message, stack };
}

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
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
      <ResetErrorButton
        resetErrorBoundary={resetErrorBoundary}
      ></ResetErrorButton>
    </main>
  );
}
