export const formatVariablesToAutocompleteSuggestions = (variablesAndEntities: string[]) => {
  return variablesAndEntities.map((item) => {
    return {
      label: item,
      apply: item,
    };
  });
};
