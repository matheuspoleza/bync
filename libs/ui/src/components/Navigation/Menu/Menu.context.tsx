import React, { createContext, useMemo } from 'react';

interface IMenuContext {
  width?: React.CSSProperties['width'];
  maxWidth?: React.CSSProperties['maxWidth'];
  minWidth?: React.CSSProperties['minWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
}

export const MenuContext = createContext<IMenuContext>({
  width: 'fit-content',
  minWidth: 200,
  maxWidth: 256,
});

export const MenuProvider: React.FC<React.PropsWithChildren<IMenuContext>> = ({
  width = 'fit-content',
  maxWidth = 256,
  minWidth = 200,
  maxHeight,
  children,
}) => {
  const value = useMemo(() => ({ width, maxWidth, minWidth, maxHeight }), [width, maxWidth, minWidth, maxHeight]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
