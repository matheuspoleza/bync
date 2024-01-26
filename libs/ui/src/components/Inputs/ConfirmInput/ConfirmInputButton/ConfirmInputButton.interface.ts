import type { IButton } from '@/main';

export interface IConfirmInputButton extends IButton {
  isLoading?: boolean;
  disabled?: boolean;
}
