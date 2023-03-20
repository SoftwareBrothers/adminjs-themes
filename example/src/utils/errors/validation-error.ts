export enum BaseValidationErrors {
  DtoValidation = 'DtoValidationError',
  InvalidUuid = 'InvalidUuidError',
}

export class ValidationError<T = unknown> extends Error {
  data: T;

  status: number;

  constructor(message: string, data?: T) {
    super(message);

    this.status = 400;
    this.data = data;
  }
}
