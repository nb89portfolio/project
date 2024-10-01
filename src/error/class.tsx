export class RebuildError extends Error {
  name: string;
  message: string;
  stack: string;
  digest: string;

  constructor(name: string, message: string, stack: string, digest: string) {
    super(message);

    this.name = name;
    this.message = message;
    this.stack = stack;
    this.digest = digest;

    Object.setPrototypeOf(this, RebuildError.prototype);
  }
}
