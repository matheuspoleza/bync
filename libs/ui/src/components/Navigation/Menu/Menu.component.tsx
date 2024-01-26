import { clsx } from '@bync/style';
import { useContext, useRef } from 'react';

import { Surface } from '@/components/Utility';
import { composeRefs } from '@/utils/ref.util';

import { useDynamicHeight } from './hooks/useDynamicHeight';
import { MenuContext } from './Menu.context';
import { listStyles, surface } from './Menu.css';
import type { IMenu } from './types';

export const Menu: React.FC<IMenu> = ({
  width,
  minWidth,
  maxWidth,
  listRef: listRefProp,
  children,
  maxHeight,
  className,
  searchSection,
  actionButtons,
  numberOfItemsToShow,
}) => {
  const context = useContext(MenuContext);
  const listRef = useRef<HTMLDivElement>(null);

  useDynamicHeight(listRef, maxHeight, numberOfItemsToShow);

  return (
    <Surface
      width={width ?? context.width}
      minWidth={minWidth ?? width ?? context.minWidth}
      maxWidth={maxWidth ?? width ?? context.maxWidth}
      direction="column"
      className={clsx(surface, className)}
    >
      {searchSection}

      {children && (
        <div
          ref={composeRefs(listRef, listRefProp)}
          style={{ maxHeight: maxHeight ?? context.maxHeight }}
          className={listStyles}
        >
          {children}
        </div>
      )}

      {actionButtons}
    </Surface>
  );
};
