export type AuthenticationField = {
  label: string;
  name: string;
  type: "email" | "string" | "password";
  placeholder: string;
  validation: RegExp;
  prompts: string;
};

export type AuthenticationFieldset = {
  [key: string]: AuthenticationField;
};

export type AuthenticationState = {
  [key: string]: {
    value: string;
    valid: boolean;
    output: string;
  };
};

export type AuthenticationForm = {
  formValid: boolean;
  fieldsetDisabled: boolean;
};
