export type DefinedError = {
  name: string;
  message: string;
  stack: string;
};

function assignErrorObjectProperty(
  key: keyof Error,
  state: "unknown" | "undefined"
) {
  return `Error ${key} is ${state}.` as string;
}

export default function defineErrorObject(error: any) {
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
