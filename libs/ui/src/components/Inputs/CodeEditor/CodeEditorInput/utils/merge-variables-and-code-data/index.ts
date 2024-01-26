import type { ICodeEditor, IVariableEntityCode, TCodeData } from '../../types';

export const mergeVariablesAndCodeData = (data: TCodeData, variablesEntities: ICodeEditor['variableEntities']) => {
  const initialValue: (string | IVariableEntityCode)[] = [];
  return data.reduce((result, part) => {
    if (typeof part === 'string') {
      result.push(part);
    } else if (variablesEntities) {
      const id = 'variableID' in part ? part.variableID : part.entityID;
      const fullVariableEntity = variablesEntities[id];
      if (fullVariableEntity) {
        result.push(fullVariableEntity);
      }
    }
    return result;
  }, initialValue);
};
