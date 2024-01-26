import type { Placement } from '@popperjs/core';
import { useRef } from 'react';

import { Popper } from '@/components/Utility/Popper/Popper.component';
import type { PopperChildrenProps, PopperReferenceProps } from '@/components/Utility/Popper/Popper.interface';
import type { BaseProps } from '@/types';
import { setRef } from '@/utils/ref.util';

import type { IMenu } from '../Menu';
import { Menu } from '../Menu';
import { menuStyles } from './ContextMenu.css';

export interface IContextMenuReference extends Omit<PopperReferenceProps, 'onOpen' | 'onToggle'> {
  onContextMenu: React.MouseEventHandler<any>;
}

export interface IContextMenuChildren extends Omit<PopperChildrenProps, 'onOpen' | 'onToggle'> {}

export interface IContextMenu extends BaseProps, Omit<IMenu, 'children'> {
  zIndex?: number;
  onClose?: VoidFunction;
  children: (props: IContextMenuChildren) => React.ReactNode;
  placement?: Placement;
  referenceElement: (props: IContextMenuReference) => React.ReactNode;
  boundToReferenceElement?: boolean;
}

export const ContextMenu: React.FC<IContextMenu> = ({
  zIndex,
  testID,
  onClose,
  children,
  placement = 'bottom-start',
  referenceElement,
  boundToReferenceElement,
  ...props
}) => {
  const contextElementRef = useRef<HTMLElement>(null);

  const onContextMenuFactory =
    ({ ref, onOpen }: { ref: React.Ref<any>; onOpen: VoidFunction }) =>
    (event: React.MouseEvent<any>) => {
      event.preventDefault();

      const getContentElementTop = () => contextElementRef.current?.getBoundingClientRect()?.top ?? 0;
      const contentElementInitialTop = getContentElementTop();

      setRef(ref, {
        contextElement: contextElementRef.current,
        getBoundingClientRect: () =>
          boundToReferenceElement
            ? contextElementRef.current?.getBoundingClientRect()
            : new DOMRect(event.clientX, event.clientY + getContentElementTop() - contentElementInitialTop),
      });

      onOpen();
    };

  return (
    <Popper
      zIndex={zIndex}
      testID={testID}
      onClose={onClose}
      placement={placement}
      referenceElement={({ ref, onToggle: _, onOpen, ...props }) =>
        referenceElement({ ...props, onContextMenu: onContextMenuFactory({ ref, onOpen }), ref: contextElementRef })
      }
    >
      {(childrenProps) => (
        <Menu {...props} minWidth={0} className={menuStyles}>
          {children(childrenProps)}
        </Menu>
      )}
    </Popper>
  );
};
