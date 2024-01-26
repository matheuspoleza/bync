import type { IEntityCode, IVariableCode, TCodeData } from '../../types';

export const formatMarkupToCodeData = (value: string): TCodeData => {
  const parts = value.split(/(<%[\S\s]*?%>)/g);
  const initialValue: TCodeData = [];

  const result: TCodeData = parts.reduce((acc, part) => {
    if (part.startsWith('<%') && part.endsWith('%>')) {
      const test = JSON.parse(part.slice(2, -2));
      const variableEntity = {
        [test.type === 'entity' ? 'entityID' : 'variableID']: test.id,
      } as IVariableCode | IEntityCode;
      acc.push(variableEntity);
    } else {
      acc.push(part);
    }
    return acc;
  }, initialValue);

  return result;
};
