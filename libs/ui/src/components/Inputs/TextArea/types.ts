import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';

import type { BaseProps, FormControlProps } from '@/types';

import type { textAreaStyleRecipe } from './TextArea.css';

export interface ITextArea
  extends BaseProps,
    FormControlProps<string>,
    Omit<TextareaAutosizeProps, 'value' | 'ref'>,
    VariantProps<typeof textAreaStyleRecipe> {
  iconOnClick?: React.MouseEventHandler<SVGSVGElement>;
  iconName?: IconName;
  minHeight?: number;
  maxHeight?: number;

  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  className?: string;
  caption?: string;
}
