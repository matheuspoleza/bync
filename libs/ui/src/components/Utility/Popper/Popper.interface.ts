import type { Placement, State } from '@popperjs/core';
import type { Modifier } from 'react-popper';

export type { Placement as PopperPlacement } from '@popperjs/core';
export type { Modifier as PopperModifier } from 'react-popper';

interface BaseRendererProps {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onToggle: VoidFunction;
}

export interface PopperReferenceProps extends BaseRendererProps {
  ref: React.Ref<any>;
  popper: React.ReactNode;
  attributes: { ['data-testid']: string };
}

export interface PopperChildrenProps extends BaseRendererProps {
  update: () => Promise<null | Partial<State>>;
  forceUpdate: VoidFunction;
  referenceRef: React.RefObject<HTMLElement>;
}

export type IPopperChildren = (props: PopperChildrenProps) => React.ReactNode;

export type PopperModifiers<Modifiers> = ReadonlyArray<Modifier<Modifiers>>;

export type PopperDefaultModifiers = 'preventOverflow';

export interface IPopper<Modifiers> {
  arrow?: React.ReactNode;
  delay?: number | [number, number];
  /**
   * @default false
   * @description if true, popper will be passed as a prop to the referenceElement,
   * useful for nested poppers or when you wanna listen popper events on the reference element
   */
  inline?: boolean;
  zIndex?: number;
  isOpen?: boolean;
  testID?: string;
  onOpen?: () => void;
  onClose?: () => void;
  children: IPopperChildren;
  className?: string;
  placement?: Placement;
  modifiers?: PopperModifiers<Modifiers>;
  portalNode?: HTMLElement;
  dismissEvent?: 'click' | 'mousedown' | 'mouseup';
  disableLayers?: boolean;
  arrowClassName?: string;
  onPreventClose?: (event?: Event) => boolean;
  referenceElement?: (props: PopperReferenceProps) => React.ReactNode;
}
