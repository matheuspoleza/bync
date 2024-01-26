import type { IconName } from '@bync/icons';

import type { IEditorButtonSuffixButton } from './EditorButtonSuffixButton';

export interface IEditorButton {
  label: string;
  secondLabel?: string;
  caption?: string;
  onClick?: () => void;
  isEmpty?: boolean;
  isActive?: boolean;
  isHovering?: boolean;
  prefixIconName?: IconName;
  isWarning?: boolean;
  warningTooltipContent?: string;
  disabled?: boolean;
  toggle?: React.ReactElement;
  fullWidth?: boolean;
  buttonClassName?: string;
  suffixButtons?: React.ReactElement<IEditorButtonSuffixButton>[];
  testID?: string;
}
