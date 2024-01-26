export const READABLE_VARIABLE_REGEXP = /{(\w{1,64})}/g;

export const hasVariables = (value: string) => !!value.match(READABLE_VARIABLE_REGEXP);
