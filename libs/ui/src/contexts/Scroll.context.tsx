import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

interface ScrollContext {
  scrollNode: HTMLDivElement | null;
}

const DEFAULT_CONTEXT: ScrollContext = {
  scrollNode: null,
};

export const ScrollContext = createContext<ScrollContext>(DEFAULT_CONTEXT);

interface ScrollProviderProps extends PropsWithChildren {
  scrollNode: HTMLDivElement | null;
}

export const useScrollContext = (): ScrollContext => useContext(ScrollContext) ?? DEFAULT_CONTEXT;

/**
 * Used to provide scroll node reference to child components
 */
export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, scrollNode }) => {
  const value = useMemo(() => ({ scrollNode }), [scrollNode]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};
