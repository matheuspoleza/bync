import { PrimaryNavigation as PrimaryNavigationComponent } from './PrimaryNavigation.component';
import { PrimaryNavigationHeader } from './PrimaryNavigationHeader';
import { PrimaryNavigationItem } from './PrimaryNavigationItem';
import { PrimaryNavigationSection } from './PrimaryNavigationSection';

export type { IPrimaryNavigation, IPrimaryNavigationItem, IPrimaryNavigationSection } from './types';

export const PrimaryNavigation = Object.assign(PrimaryNavigationComponent, {
  Section: PrimaryNavigationSection,
  Item: PrimaryNavigationItem,
  Header: PrimaryNavigationHeader,
});
