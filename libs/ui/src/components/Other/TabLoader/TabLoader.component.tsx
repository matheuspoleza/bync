import type { VariantProps } from '@bync/style';

import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';
import type { BaseProps } from '@/types';

import { LoadingSpinner } from '../LoadingSpinner';
import type { spinnerRecipe } from '../LoadingSpinner/LoadingSpinner.css';
import { spinnerStyles } from './TabLoader.css';

export interface ITabLoader extends BaseProps, IBox, VariantProps<typeof spinnerRecipe> {}

export const TabLoader: React.FC<ITabLoader> = ({ testID, variant = 'light', ...props }) => {
  return (
    <Box testID={testID} width="100%" height="100%" align="center" justify="center" {...props}>
      <LoadingSpinner className={spinnerStyles} variant={variant} size="large" />
    </Box>
  );
};
