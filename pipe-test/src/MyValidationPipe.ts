import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const object = plainToInstance(metatype, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const errors = await validate(object);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (errors.length > 0) {
      throw new BadRequestException('参数验证失败');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
