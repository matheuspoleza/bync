import type { ICodeEditor } from '../../types';
import { decorateStringForVariables } from '../decorate-string-for-variables';

export const getRelevantAutoSuggestions = (word: string | null, suggestions: string[]) => {
  if (!word) {
    return [];
  }
  return suggestions
    .filter((keyword) => keyword.includes(word) && keyword !== word)
    .sort((a, b) => {
      const aDistance = a.indexOf(word);
      const bDistance = b.indexOf(word);
      return aDistance - bDistance;
    })
    .map((item) => {
      return {
        label: item,
        value: item,
      };
    });
};

export const getVariableEntityAutoSugguestions = (
  word: string | null,
  suggestions: ICodeEditor['variableEntities']
) => {
  if (!word || !suggestions) {
    return [];
  }
  const variableEntityAutocompleteSuggestions = Object.values(suggestions)
    .filter((keyword) => keyword.name.toLowerCase().includes(word.toLowerCase()) && keyword.name !== word)
    .sort((a, b) => {
      const aDistance = a.name.indexOf(word);
      const bDistance = b.name.indexOf(word);
      return aDistance - bDistance;
    });

  return variableEntityAutocompleteSuggestions.map((item) => {
    return { label: item.name, value: decorateStringForVariables(JSON.stringify(item)) };
  });
};
