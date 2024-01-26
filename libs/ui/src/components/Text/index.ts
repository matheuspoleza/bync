import { HighlightedText } from './HighlightedText/HighlightedText.component';
import { Text as TextComponent } from './Text.component';
import * as css from './Text.css';

export type { IHighlightedText } from './HighlightedText/types';
export type { IText } from './types';

export const Text = Object.assign(TextComponent, { css, Highlighted: HighlightedText });
