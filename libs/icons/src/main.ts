import type * as Icons from './components';
import type * as Figures from './figures';

export * from './components';
export * from './figures';

export type IconName = keyof typeof Icons | keyof typeof Figures;
