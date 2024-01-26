import { AvatarList } from './AvatarList';
import {
  NavigationButton,
  NotificationButton,
  PrimaryButton,
  PrimaryIconButton,
  SecondaryButton,
  SecondaryIconButton,
} from './Button';
import { Header as HeaderComponent } from './Header.component';
import { CenterSection, LeftActionsSection, LeftSection, RightActionsSection, RightSection } from './Section';

export type { IHeader } from './types';

export const Header = Object.assign(HeaderComponent, {
  AvatarList,

  Button: {
    Primary: PrimaryButton,
    Secondary: SecondaryButton,
    Navigation: NavigationButton,
    IconPrimary: PrimaryIconButton,
    Notification: NotificationButton,
    IconSecondary: SecondaryIconButton,
  },

  Section: {
    Left: LeftSection,
    Right: RightSection,
    Center: CenterSection,
    LeftActions: LeftActionsSection,
    RightActions: RightActionsSection,
  },
});
