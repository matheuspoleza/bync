import type React from 'react';

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
  update: () => Promise<any>;
  forceUpdate: VoidFunction;
}

export type IPopperChildren = (props: PopperChildrenProps) => React.ReactNode;
