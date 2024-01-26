import type { IconName } from '@bync/icons';
import type React from 'react';

import type { IButton } from '@/main';

export interface ICodeEditorWrapper {
  title: string;
  codeEditor: React.ReactNode;
  headerButtonProps?: {
    iconName: IconName;
    onClick: () => void;
  };
  showExpandButton?: boolean;
  bottomButtonProps?: IButton;
}
