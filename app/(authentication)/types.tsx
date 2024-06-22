export type AuthenticationField = {
  label: string;
  name: string;
  type: "email" | "string" | "password";
  placeholder: string;
  validation: RegExp;
  prompts: string;
};
