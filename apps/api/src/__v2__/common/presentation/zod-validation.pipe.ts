import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodTypeAny, z } from 'zod';

export class ZodValidationPipe<T extends ZodTypeAny> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: z.infer<T>, metadata: ArgumentMetadata): z.infer<T> {
    if (metadata.type === 'body') {
      const result = this.schema.safeParse(value);
      if (result.success === false) {
        throw new BadRequestException(result.error.format());
      }

      return result.data;
    }
  }
}
