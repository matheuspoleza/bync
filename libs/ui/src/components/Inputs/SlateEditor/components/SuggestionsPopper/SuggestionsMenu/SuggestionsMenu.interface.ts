import type { IconName } from '@bync/icons';

export interface BaseSuggestionsMenuItem {
  id: string;
  name: string;
  iconName?: IconName;
}

export interface ISuggestionsMenu<Item extends BaseSuggestionsMenuItem> {
  search: string;
  onEdit?: (item: Item) => void;
  canEdit?: boolean;
  onSelect: (item: Item) => void;
  onCreate?: (text: string) => Item | Promise<Item>;
  canCreate?: boolean;
  formatter?: (text: string) => string;
  referenceNode: HTMLElement;
  suggestionsMap?: Record<string, Item>;
  notExistMessage?: string;
  notFoundMessage?: string;
  createButtonLabel?: string;
}
