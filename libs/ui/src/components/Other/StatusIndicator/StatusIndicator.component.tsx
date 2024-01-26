import { statusIndicatorRecipe } from './StatusIndicator.css';
import type { IStatusIndicator } from './types';

export const StatusIndicator: React.FC<IStatusIndicator> = ({ status = 'default', testID }) => {
  const statusStyles = statusIndicatorRecipe({ status });

  return <div className={statusStyles} data-testid={testID} />;
};
