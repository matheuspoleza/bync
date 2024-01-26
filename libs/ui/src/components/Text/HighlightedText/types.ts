import type { VariantProps } from '@bync/style';

import type { IText } from '../types';
import type { highlightedTextStyles } from './HighlightedText.css';

export interface IHighlightedText
  extends Omit<IText, 'children' | 'align'>,
    VariantProps<typeof highlightedTextStyles> {
  text: React.ReactNode;
  highlight?: string;
}
