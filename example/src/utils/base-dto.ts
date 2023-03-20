import {
  instanceToPlain,
  plainToInstance,
  ClassConstructor,
} from 'class-transformer';
import { validate } from 'class-validator';

import { BaseValidationErrors, ValidationError } from './errors';

export class BaseDto {
  public toJSON() {
    return instanceToPlain(this);
  }

  public async validate() {
    const errors = await validate(this);
    if (errors.length) {
      throw new ValidationError(BaseValidationErrors.DtoValidation, errors);
    }

    return this;
  }

  public static build<T extends BaseDto>(
    dtoClass: ClassConstructor<T>,
    data: Record<string, unknown>
  ): T {
    return plainToInstance<T, Record<string, unknown>>(dtoClass, data);
  }
}
