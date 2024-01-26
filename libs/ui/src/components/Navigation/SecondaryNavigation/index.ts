import { SecondaryNavigation as SecondaryNavigationComponent } from './SecondaryNavigation.component';
import { SecondaryNavigationItem } from './SecondaryNavigationItem';
import { SecondaryNavigationSection } from './SecondaryNavigationSection';

export type { ISecondaryNavigation, ISecondaryNavigationItem, ISecondaryNavigationSection } from './types';

export const SecondaryNavigation = Object.assign(SecondaryNavigationComponent, {
  Section: SecondaryNavigationSection,
  Item: SecondaryNavigationItem,
});
