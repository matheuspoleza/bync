import type { IButton } from '@/components/Buttons';
import { Button } from '@/components/Buttons';

import { iconButtonStyle, navigationButtonStyle } from './Button.css';
import type { IHeaderIconButton, INotificationButton } from './types';

export const NavigationButton: React.FC<IButton> = ({ ...props }) => (
  <Button {...props} iconName="ArrowLeft" variant="secondaryDark" size="large" className={navigationButtonStyle} />
);

export const PrimaryButton: React.FC<IButton> = ({ ...props }) => <Button {...props} size="large" />;

export const SecondaryButton: React.FC<IButton> = ({ ...props }) => (
  <Button {...props} variant="secondaryDark" size="large" />
);

export const SecondaryIconButton: React.FC<IHeaderIconButton> = ({ ...props }) => (
  <Button {...props} variant="secondaryDark" size="large" className={iconButtonStyle} />
);

export const PrimaryIconButton: React.FC<IHeaderIconButton> = ({ ...props }) => (
  <Button {...props} variant="primary" size="large" className={iconButtonStyle} />
);

export const NotificationButton: React.FC<INotificationButton> = ({ count }) => (
  <Button label={count.toString()} size="small" variant="tertiaryDark" iconName="Warning" />
);
