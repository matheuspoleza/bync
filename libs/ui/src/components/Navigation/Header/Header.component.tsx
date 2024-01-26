import { clsx } from '@bync/style';

import { headerStyles } from './Header.css';
import type { IHeader } from './types';

export const Header: React.FC<IHeader> = ({
  kind = 'default',
  testID,
  variant = 'default',
  children,
  className,
  ...props
}) => (
  <header {...props} className={clsx(headerStyles({ kind, variant }), className)} data-testid={testID}>
    {children}
  </header>
);
