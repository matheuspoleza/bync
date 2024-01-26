import type { VariantProps } from '@bync/style';
import { clsx } from '@bync/style';

import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';

import { hueSliderContainerStyles, hueTrackRecipe } from './Track.css';

export interface ITrack extends IBox, VariantProps<typeof hueTrackRecipe> {}

export const Track: React.FC<ITrack> = ({ testID, className, variant, children, ...props }) => {
  const variantStyles = hueTrackRecipe({ variant });
  return (
    <Box {...props} className={clsx(hueSliderContainerStyles, variantStyles, className)} testID={testID} width="164px">
      {children}
    </Box>
  );
};
