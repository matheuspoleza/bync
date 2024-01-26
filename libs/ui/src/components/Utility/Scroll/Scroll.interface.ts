import type { IBox } from '../Box';

export interface IScroll extends Omit<IBox, 'oveflow' | 'overflowY'> {}
