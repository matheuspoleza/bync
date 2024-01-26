import { match, P } from 'ts-pattern';

export const generateExample = (componentName: string, combination: Record<string, any>) => {
  return `<${componentName} ${Object.entries(combination)
    .map(([key, value]) => {
      const valueExpression = match(value)
        .with(undefined, () => null)
        .with(true, () => '')
        .with(P.string, () => `=${JSON.stringify(value)}`)
        .with({}, () => `={${JSON.stringify(value)}}`)
        .otherwise(() => `={${value}}`);

      if (valueExpression === null) return '';

      return `${key}${valueExpression} `;
    })
    .join('')}/>\n`;
};
