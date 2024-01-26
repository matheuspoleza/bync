import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { ITab } from './Tab';
import type { tabGroupContainer, tabWrapperRecipe } from './TabGroup.css';

export interface ITabGroup
  extends BaseProps,
    VariantProps<typeof tabWrapperRecipe>,
    VariantProps<typeof tabGroupContainer> {
  tabs: Pick<ITab, Exclude<keyof ITab, 'isActive' | 'index'>>[];
  activeTab: number;
  onChange: (tab: number) => void;
  hasDividers?: boolean;
  size?: 'default' | 'large';
  hasAddButton?: boolean;
  onAddButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
