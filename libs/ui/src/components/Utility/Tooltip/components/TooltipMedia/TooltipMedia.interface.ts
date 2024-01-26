import type { VariantProps } from '@bync/style';

import type { IBox } from '@/components/Utility/Box';

import type { mediaRecipe } from './TooltipMedia.css';

export interface ITooltipMedia extends IBox, VariantProps<typeof mediaRecipe> {}
