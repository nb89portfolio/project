type ValidationInputOutputValidator = RegExp | string;

type ValidationInputOutputProps = {
  name: string;
  value: string;
  validator: ValidationInputOutputValidator;
  prompt: string;
};

function determinePrompt(
  value: string,
  validator: ValidationInputOutputValidator,
  prompt: string
) {
  const isString = typeof validator === "string";

  const isValid = isString ? value === validator : validator.test(value);

  return isValid ? "" : prompt;
}

export default function ValidationInputOutput({
  name,
  value,
  validator,
  prompt,
}: ValidationInputOutputProps) {
  const output = determinePrompt(value, validator, prompt);

  return <output htmlFor={name}>{output}</output>;
}
