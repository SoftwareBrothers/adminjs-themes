export class AuthorizationError<T = unknown> extends Error {
  public data?: T;

  public status: number;

  constructor(message: string, data?: T) {
    super(message);

    this.status = 403;
    this.data = data;
  }
}
