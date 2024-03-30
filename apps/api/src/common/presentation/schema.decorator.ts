import * as Swagger from '@nestjs/swagger';
import { ApiQueryOptions } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import { flattenQueryParametersSchema } from './utils';

type ZodExtendedOptions<
  TOptions extends object,
  TSchema extends z.ZodTypeAny,
> = Omit<TOptions, 'schema'> & {
  schema?: TSchema;
};

/** Allows @nestjs/swagger decorators to be passed a Zod schema */
const extendSwaggerDecorator =
  <TApi extends (...args: any[]) => any>(api: TApi) =>
  <TSchema extends z.ZodTypeAny>({
    schema,
    ...options
  }: ZodExtendedOptions<Parameters<TApi>[0], TSchema>): ReturnType<TApi> =>
    api({
      ...options,
      ...(schema ? { schema: zodToOpenAPI(schema) } : {}),
    });

export const ZodApiBody = extendSwaggerDecorator(Swagger.ApiBody);

export const ZodApiResponse = extendSwaggerDecorator(Swagger.ApiResponse);

export const ZodApiHeader = extendSwaggerDecorator(Swagger.ApiHeader);

export const ZodApiParam = extendSwaggerDecorator(Swagger.ApiParam);

const queryDecorator = extendSwaggerDecorator(Swagger.ApiQuery);

/** Allows multiple query parameters to be described using a single object schema */
export const ZodApiQuery = <TSchema extends z.ZodTypeAny>(
  options: ZodExtendedOptions<ApiQueryOptions, TSchema>,
): MethodDecorator => {
  if (options.name || !options.schema) {
    return queryDecorator(options);
  }

  const parameters = flattenQueryParametersSchema(options.schema);
  return (...args) =>
    parameters.forEach(([name, schema]) => {
      queryDecorator({
        ...options,
        name,
        schema,
        required: !schema.isOptional(),
      })(...args);
    });
};
