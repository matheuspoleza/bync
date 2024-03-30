import { z } from 'nestjs-zod/z';

export const getZodType = (schema: z.ZodTypeAny) => schema._def?.typeName ?? '';

export const isZodType =
  <T extends z.ZodTypeAny>(typeName: string) =>
  (schema: z.ZodTypeAny): schema is T =>
    getZodType(schema) === typeName;

export const isZodObject = isZodType<z.ZodObject<any, any, any>>('ZodObject');
export const isZodUnion = isZodType<z.ZodUnion<[any, ...any[]]>>('ZodUnion');

export const flattenQueryParametersSchema = (
  root: z.ZodTypeAny,
): (readonly [string, z.ZodTypeAny])[] => {
  if (isZodObject(root)) {
    return Object.entries(root.shape);
  }

  if (isZodUnion(root)) {
    return root.options.flatMap((schema) =>
      flattenQueryParametersSchema(schema).map(
        ([name, parameter]) => [name, parameter.optional()] as const,
      ),
    );
  }

  throw new Error(
    `unable to flatten type ${getZodType(
      root,
    )} into query parameters, try an object or union of objects`,
  );
};
