import { ActionButtons } from './ActionButtons';
import { CreateItem } from './CreateItem/CreateItem.component';
import { Menu as MenuComponent } from './Menu.component';
import { MenuDivider } from './MenuDivider';
import { MenuItem } from './MenuItem';
import { NotFound } from './NotFound/NotFound.component';
import { Search } from './Search';

export type { IActionButtons } from './ActionButtons';
export { ActionButtons } from './ActionButtons';
export { MenuContext, MenuProvider } from './Menu.context';
export type { IMenuDivider } from './MenuDivider';
export type { IMenuItem } from './MenuItem';
export { MENU_ITEM_MIN_HEIGHT, MenuItem } from './MenuItem';
export type { ISearch } from './Search';
export { Search } from './Search';
export type { IMenu } from './types';

export const Menu = Object.assign(MenuComponent, {
  Item: MenuItem,
  Search,
  Divider: MenuDivider,
  NotFound,
  CreateItem,
  ActionButtons,
});
