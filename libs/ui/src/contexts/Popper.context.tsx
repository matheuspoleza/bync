import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

interface PopperContext {
  zIndex: number;
  portalNode: HTMLElement;
}

const DEFAULT_CONTEXT: PopperContext = {
  zIndex: 100,
  portalNode: globalThis.document?.body,
};

export const PopperContext = createContext<PopperContext>(DEFAULT_CONTEXT);

interface PopperProviderProps extends PropsWithChildren {
  zIndex?: number;
  portalNode?: HTMLElement;
}

export const usePopperContext = (): PopperContext => useContext(PopperContext) ?? DEFAULT_CONTEXT;

/**
 * Used to increase the z-index for nested poppers elements.
 */
export const PopperProvider: React.FC<PopperProviderProps> = ({ zIndex, children, portalNode }) => {
  const context = usePopperContext();

  const value = useMemo(
    () => ({
      ...context,
      zIndex: (zIndex ?? context.zIndex) + 1,
      portalNode: portalNode ?? context.portalNode,
    }),
    [zIndex, context, portalNode]
  );

  return <PopperContext.Provider value={value}>{children}</PopperContext.Provider>;
};
