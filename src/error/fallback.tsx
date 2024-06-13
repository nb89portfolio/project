import { FallbackProps } from "react-error-boundary";
import ResetErrorButton from "./resetButton";
import { DefinedError } from "./types";

function assignErrorObjectProperty(
  key: keyof Error,
  state: "unknown" | "undefined"
) {
  return `Error ${key} is ${state}.` as string;
}

function defineErrorObject(error: any) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  const name = isError
    ? error.name
    : assignErrorObjectProperty("name", "unknown");
  const message = isError
    ? error.message
    : assignErrorObjectProperty("message", "unknown");

  const stack = isError
    ? error.stack
    : assignErrorObjectProperty("stack", "unknown");

  const definedStack =
    stack !== undefined
      ? stack
      : assignErrorObjectProperty("stack", "undefined");

  return {
    name,
    message,
    stack: definedStack,
  } as DefinedError;
}

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  const { name, message, stack } = defineErrorObject(error);

  return (
    <main>
      <h2>{name}</h2>
      <p>{message}</p>
      <details>{stack}</details>
      <ResetErrorButton
        resetErrorBoundary={resetErrorBoundary}
      ></ResetErrorButton>
    </main>
  );
}
