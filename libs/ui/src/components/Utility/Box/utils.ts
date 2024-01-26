export const toPX = (value?: number | string): string => (typeof value === 'number' ? `${value}px` : value ?? '');

export const getInlineSpacing = (
  t?: number | string,
  r?: number | string,
  b?: number | string,
  l?: number | string
) => {
  if (!t && !r && !b && !l) return '';

  return `${toPX(t ?? 0)} ${toPX(r ?? 0)} ${toPX(b ?? 0)} ${toPX(l ?? 0)}`;
};
