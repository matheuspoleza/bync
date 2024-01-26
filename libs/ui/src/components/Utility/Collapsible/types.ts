import type { BaseProps } from '@/types';

export interface ICollapsible extends BaseProps {
  header: React.ReactElement;
  children: React.ReactNode | ((isOpen: boolean) => React.ReactElement);
  isOpen?: boolean;
  isEmpty?: boolean;
  isDisabled?: boolean;
  showDivider?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  dividerClassName?: string;
  isSection?: boolean;
  noBottomPadding?: boolean;
}
