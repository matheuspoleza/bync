import type { TCode, TCodeEditorData } from '../../types';
import { decorateStringForVariables } from '../decorate-string-for-variables';

export const formatDataToCodeMirrorFormat = (value: TCodeEditorData, language: TCode) => {
  return value
    .map((item) => {
      if (typeof item === 'string') {
        if (language === 'json') {
          return formatJSONWithNewlines(item);
        }
        return item;
      }
      return decorateStringForVariables(JSON.stringify(item));
    })
    .join('');
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const formatJSONWithNewlines = (jsonString: string) => {
  let result = '';
  let indentLevel = 0;
  let inString = false;

  for (const element of jsonString) {
    const char = element;

    if (char === '{' || char === '[') {
      result += char;
      if (!inString) {
        indentLevel++;
        result += `\n${' '.repeat(indentLevel * 2)}`;
      }
    } else if (char === '}' || char === ']') {
      if (!inString) {
        indentLevel--;
        result += `\n${' '.repeat(indentLevel * 2)}`;
      }
      result += char;
    } else if (char === '"') {
      result += char;
      inString = !inString;
    } else if (char === ',') {
      result += char;
      if (!inString) {
        result += `\n${' '.repeat(indentLevel * 2)}`;
      }
    } else {
      result += char;
    }
  }

  return result;
};
