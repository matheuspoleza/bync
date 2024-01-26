import type { BaseSuggestionsMenuItem, ISuggestionsMenu } from './SuggestionsMenu/SuggestionsMenu.interface';

export interface ISuggestionsPopper<T extends BaseSuggestionsMenuItem> extends ISuggestionsMenu<T> {
  isSelected?: boolean;
}
