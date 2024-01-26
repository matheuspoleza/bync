import type { PopperDefaultModifiers, PopperModifiers } from './Popper.interface';

export const DEFAULT_MODIFIERS: PopperModifiers<PopperDefaultModifiers> = [
  { name: 'preventOverflow', options: { boundary: globalThis.document?.body, padding: 16 } },
];
