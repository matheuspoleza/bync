import type { Grammar } from 'prismjs';

export enum PrismVariablesProperty {
  VF_VARIABLE = 'vf_variable',
}

export const VF_MARKUP_GRAMMAR: Grammar = {
  [PrismVariablesProperty.VF_VARIABLE]: /{[\w- ]*}?/,
};
