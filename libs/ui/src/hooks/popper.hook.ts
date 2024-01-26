/* eslint-disable @bync-meta/interface-prefix */
import type * as PopperJS from '@popperjs/core';
import { useMemo, useState } from 'react';
import type { Modifier } from 'react-popper';
import { usePopper as usePopperBase } from 'react-popper';

import { DEFAULT_MODIFIERS } from '@/components/Utility/Popper/Popper.constant';
import type { PopperModifier } from '@/components/Utility/Popper/Popper.interface';
import { usePopperContext } from '@/contexts';
import type { Nullable } from '@/types';

export type { Placement as PopperPlacement } from '@popperjs/core';

export interface PopperOptions<Modifiers> extends Omit<Partial<PopperJS.Options>, 'modifiers'> {
  modifiers?: ReadonlyArray<Modifier<Modifiers>>;
  createPopper?: typeof PopperJS.createPopper;
}

export type PopperVirtualElement = PopperJS.VirtualElement;
export type StrictPopperModifiers = ReadonlyArray<Modifier<NonNullable<PopperJS.StrictModifiers['name']>>>;

interface BasePopperAPI {
  state: PopperJS.State | null;
  update: PopperJS.Instance['update'] | null;
  styles: { popper?: React.CSSProperties };
  attributes: { popper?: Record<string, string> };
  forceUpdate: PopperJS.Instance['forceUpdate'] | null;
}

export interface PopperAPI<
  TriggerRef extends Nullable<Element | PopperJS.VirtualElement>,
  PopperRef extends Nullable<HTMLElement>
> extends BasePopperAPI {
  popperElement: Nullable<PopperRef>;
  setPopperElement: React.Dispatch<React.SetStateAction<Nullable<PopperRef>>>;
  referenceElement: Nullable<TriggerRef>;
  setReferenceElement: React.Dispatch<React.SetStateAction<Nullable<TriggerRef>>>;
}

export const usePopper = <
  TriggerRef extends Nullable<Element | PopperJS.VirtualElement>,
  PopperRef extends Nullable<HTMLElement>,
  Modifiers
>(
  popperOptions?: PopperOptions<Modifiers>
): PopperAPI<TriggerRef, PopperRef> => {
  const { zIndex } = usePopperContext();

  const [popperElement, setPopperElement] = useState<Nullable<PopperRef>>(null);
  const [referenceElement, setReferenceElement] = useState<Nullable<TriggerRef>>(null);

  const popperProps = usePopperBase(referenceElement, popperElement, popperOptions);

  if (popperProps.styles.popper) {
    Object.assign(popperProps.styles.popper, { zIndex });
  }

  return {
    ...popperProps,
    popperElement,
    setPopperElement,
    referenceElement,
    setReferenceElement,
  };
};

interface VirtualPopperAPI<PopperRef extends Nullable<HTMLElement>> extends BasePopperAPI {
  popperElement: Nullable<PopperRef>;
  setPopperElement: React.Dispatch<React.SetStateAction<Nullable<PopperRef>>>;
}

export const useVirtualElementPopper = <
  VirtualElement extends Nullable<PopperJS.VirtualElement>,
  PopperRef extends Nullable<HTMLElement>,
  Modifiers
>(
  virtualElement: VirtualElement,
  popperOptions?: PopperOptions<Modifiers>
): VirtualPopperAPI<PopperRef> => {
  const { zIndex } = usePopperContext();

  const [popperElement, setPopperElement] = useState<Nullable<PopperRef>>(null);

  const popperProps = usePopperBase(virtualElement, popperElement, popperOptions);

  if (popperProps.styles.popper) {
    Object.assign(popperProps.styles.popper, { zIndex });
  }

  return {
    ...popperProps,
    popperElement,
    setPopperElement,
  };
};

export const usePopperModifiers = <Modifiers>(
  modifiers: ReadonlyArray<PopperModifier<Modifiers>>,
  deps: unknown[] = []
) => useMemo(() => [...DEFAULT_MODIFIERS, ...modifiers], deps);
