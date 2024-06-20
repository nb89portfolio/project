import { Dispatch, SetStateAction } from "react";

type ValidationInputOutputValidator = RegExp | string;

type ValidationInputOutputSetState = Dispatch<
  SetStateAction<{
    [key: string]: {
      isValid: boolean;
      [key: string]: any;
    };
  }>
>;

type ValidationInputOutputProps = {
  name: string;
  value: string;
  validator: ValidationInputOutputValidator;
  prompt: string;
  setState: ValidationInputOutputSetState;
};

function determinePrompt(
  name: string,
  value: string,
  validator: ValidationInputOutputValidator,
  prompt: string,
  setState: ValidationInputOutputSetState
) {
  const isString = typeof validator === "string";

  const isValid = isString ? value === validator : validator.test(value);

  setState((previousState) => {
    return {
      ...previousState,
      [name]: {
        ...previousState[name],
        isValid,
      },
    };
  });

  return isValid ? "" : prompt;
}

export default function ValidationInputOutput({
  name,
  value,
  validator,
  prompt,
  setState,
}: ValidationInputOutputProps) {
  const output = determinePrompt(name, value, validator, prompt, setState);

  return <output htmlFor={name}>{output}</output>;
}
