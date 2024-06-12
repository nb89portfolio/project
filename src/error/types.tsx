export type DefinedError = {
  name: string;
  message: string;
  stack: string;
};

export type DefinedErrorInfo = {
  componentStack: string;
  digest: string;
};

export type ErrorReport = DefinedError & DefinedErrorInfo;
