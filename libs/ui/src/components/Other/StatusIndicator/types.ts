import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { statusIndicatorRecipe } from './StatusIndicator.css';

export interface IStatusIndicator extends BaseProps, VariantProps<typeof statusIndicatorRecipe> {}
