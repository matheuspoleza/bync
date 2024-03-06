import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, SafeParseError, SafeParseReturnType } from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // Aplicar a validação somente ao corpo da requisição
    if (metadata.type !== 'body') {
      return value;
    }

    const result: SafeParseReturnType<T, any> = this.schema.safeParse(value);

    // Verificar se a validação falhou
    if (!result.success) {
      // 'result' é do tipo 'SafeParseError' aqui, então podemos acessar 'error'
      const error: SafeParseError<any> = result as SafeParseError<any>;
      throw new BadRequestException(error.error.format());
    }

    // Retornar os dados validados
    return result.data;
  }
}
