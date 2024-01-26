import { clsx } from '@bync/style';

import { drawerContainer } from './Drawer.css';
import type { IDrawer } from './types';

export const Drawer: React.FC<IDrawer> = ({ children, isOpen, width = 350, className, testID }) => {
  const rightPosition = `${isOpen ? 0 : -width}px`;
  return (
    <div className={clsx(drawerContainer, className)} style={{ width, right: rightPosition }} data-testid={testID}>
      {isOpen && children}
    </div>
  );
};
