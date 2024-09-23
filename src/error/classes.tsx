class RebuiltError extends Error {
  name = '';
  stack = '';
  digest = '';

  constructor(name: string, message: string, stack: string, digest: string) {
    super(message);

    this.name = name;
    this.message = message;
    this.stack = stack;
    this.digest = digest;

    Object.setPrototypeOf(this, RebuiltError.prototype);
  }
}

export { RebuiltError };
