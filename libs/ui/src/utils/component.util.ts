export const setComponentDisplayName = <C extends (...args: any[]) => React.ReactElement | null>(
  Component: C & { displayName?: string },
  name: string
) => {
  // eslint-disable-next-line no-param-reassign
  Component.displayName = name;

  return Component;
};
