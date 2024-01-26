import { Plus } from '@bync/icons';

import { addTabStyles } from './AddTab.css';
import type { IAddTab } from './types';

export const AddTab: React.FC<IAddTab> = ({ onClick, width, size, testID }) => {
  const styles = addTabStyles({ width, size });

  return (
    <button className={styles} onClick={onClick} data-testid={testID}>
      <Plus viewBox="4 4 16 16" height="16px" width="16px" />
    </button>
  );
};
