import {
  ArgumentMetadata,
  ValidationPipe,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseUtils } from '../utils/resposne.utils';

@Injectable()
export class ValidatePipe extends ValidationPipe {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.validateMetaType(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = this.flattenValidationErrors(errors);
      const formattedError = ResponseUtils.BadRequestResponse(errorMessages);
      throw new BadRequestException(formattedError);
    }
    return value;
  }

  private validateMetaType(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
