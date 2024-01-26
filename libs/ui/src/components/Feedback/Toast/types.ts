import type { IButton } from '@/components/Buttons';
import type { BaseProps } from '@/types';

export interface IToast extends BaseProps {
  text: string | React.ReactNode;
  variant?: 'default' | 'success' | 'alert';
  id?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;

  /**
   * @description callback when the close button is clicked
   */
  onClose?: () => void;

  /**
   * @default true
   * @description if true, it will display a close button
   */
  isClosable?: boolean;
  isLoading?: boolean;
  actionButtonProps?: IButton;
}
