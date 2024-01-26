import * as Icons from '@bync/icons';

import { LoadingSpinner } from '../../Other/LoadingSpinner';
import { circleButtonStyles, iconStyles, loadingSpinnerStyles } from './CircleButton.css';
import type { ICircleButton } from './types';

export const CircleButton: React.FC<ICircleButton> = ({ iconName, onClick, disabled, isLoading, testID }) => {
  const IconToDisplay = iconName && Icons[iconName];

  return (
    <button className={circleButtonStyles} onClick={onClick} disabled={disabled} data-testid={testID}>
      {isLoading && <LoadingSpinner className={loadingSpinnerStyles} testID={`${testID}--loading-spinner`} />}
      {!isLoading && <IconToDisplay className={iconStyles} height={24} width={24} data-testid={`${testID}--icon`} />}
    </button>
  );
};
