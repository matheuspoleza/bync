import { MenuItem as MenuItemComponent } from './MenuItem.component';
import { MenuItemWithButton } from './MenuItemWithButton';

export { MENU_ITEM_MIN_HEIGHT } from './MenuItem.constant';
export type { IMenuItem } from './types';

export const MenuItem = Object.assign(MenuItemComponent, {
  WithButton: MenuItemWithButton,
});
