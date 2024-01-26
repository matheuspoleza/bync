export const snapToClosestMark = (marks: number[], currentValue: number) => {
  return marks.reduce((prev, curr) => (Math.abs(curr - currentValue) < Math.abs(prev - currentValue) ? curr : prev));
};
