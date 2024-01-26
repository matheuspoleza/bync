import type { BaseProps } from '@/types';

export interface ICollapsibleHeaderChildren {
  /**
   * @description styles for the header child on header hover
   */
  headerChildrenStyles?: string;
  isOpen?: boolean;
}

export interface ICollapsibleHeader extends BaseProps {
  label: string;
  caption?: string;
  isOpen?: boolean;
  isEmpty?: boolean;
  isDisabled?: boolean;
  isSection?: boolean;
  className?: string;
  containerClassName?: string;
  children?: (props: ICollapsibleHeaderChildren) => React.ReactNode;
}
