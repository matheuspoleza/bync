export const getInlineStyles = (mapping: { [x: string]: string | number | undefined }) => {
  return Object.entries(mapping).reduce((finalStyles, [key, value]) => {
    if (value || value === 0) {
      Object.assign(finalStyles, { [key]: typeof value === 'number' ? `${value}px` : value });
    }
    return finalStyles;
  }, {});
};
