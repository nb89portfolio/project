export default class NextJSError extends Error {
  digest?: string;

  constructor(name: string, message: string, stack?: string, digest?: string) {
    super(message);

    this.name = name;
    this.stack = stack;
    this.digest = digest;

    Object.setPrototypeOf(this, NextJSError.prototype);
  }
}
