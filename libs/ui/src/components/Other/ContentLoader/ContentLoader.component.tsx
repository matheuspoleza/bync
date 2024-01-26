import type { VariantProps } from '@bync/style';
import { clsx } from '@bync/style';

import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';
import type { BaseProps } from '@/types';

import { LoadingSpinner } from '../LoadingSpinner';
import type { spinnerRecipe } from '../LoadingSpinner/LoadingSpinner.css';
import { loaderStyles } from './ContentLoader.css';

export interface IContentLoader extends BaseProps, IBox, VariantProps<typeof spinnerRecipe> {}

export const ContentLoader: React.FC<IContentLoader> = ({
  variant = 'light',
  size = 'large',
  className,
  testID,
  ...props
}) => {
  return (
    <Box
      className={clsx(loaderStyles, className)}
      testID={testID}
      width="100%"
      height="100%"
      align="center"
      justify="center"
      {...props}
    >
      <LoadingSpinner variant={variant} size={size} />
    </Box>
  );
};
