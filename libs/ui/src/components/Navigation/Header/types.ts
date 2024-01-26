import type { VariantProps } from '@bync/style';
import type React from 'react';

import type { BaseProps } from '@/types';

import type { headerStyles } from './Header.css';

export interface IHeader extends BaseProps, VariantProps<typeof headerStyles>, React.ComponentProps<'header'> {}
