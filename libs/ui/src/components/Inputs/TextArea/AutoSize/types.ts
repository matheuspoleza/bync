import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { textAreaStyleRecipe } from '../TextArea.css';

export interface ITextAreaAutoSize
  extends React.ComponentPropsWithoutRef<'textarea'>,
    VariantProps<typeof textAreaStyleRecipe> {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  iconName?: IconName;
  onIconClick?: React.MouseEventHandler<SVGSVGElement>;
  testID?: string;
  caption?: string;
  captionClassName?: string;
  onFocus?: VoidFunction;
  isFocused?: boolean;
}
