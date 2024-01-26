import { defaultColors } from '@/utils/colors/color.util';

import type { IVariableEntityCode } from '../../types';

export const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'entity',
    name: 'Entity 1',
    color: defaultColors.hibiscus,
    variant: 'entity',
  },
  id2: {
    id: 'id2',
    kind: 'entity',
    name: 'Entity 2',
    color: defaultColors.copper,
    variant: 'entity',
  },
  id3: {
    id: 'id3',
    kind: 'entity',
    name: 'Entity 3',
    color: defaultColors.havelock,
    variant: 'entity',
  },
  id4: {
    id: 'id4',
    kind: 'entity',
    name: 'Entity 4',
    color: defaultColors.fern,
    variant: 'entity',
  },
  id5: {
    id: 'id5',
    kind: 'entity',
    name: 'Entity 5',
    color: defaultColors.copper,
    variant: 'entity',
  },
  id6: {
    id: 'id6',
    kind: 'entity',
    name: 'Entity 6',
    color: defaultColors.neutral,
    variant: 'entity',
  },
  id7: {
    id: 'id7',
    kind: 'variable',
    name: 'Variable 7',
    color: defaultColors.copper,
    variant: 'variable',
  },
  id8: {
    id: 'id8',
    kind: 'variable',
    name: 'HowdyFolks',
    color: defaultColors.fern,
    variant: 'variable',
  },
  id9: {
    id: 'id9',
    kind: 'variable',
    name: 'Variable 8',
    color: defaultColors.neutral,
    variant: 'variable',
  },
  id10: {
    id: 'id10',
    kind: 'variable',
    name: 'Variable 9',
    color: defaultColors.havelock,
    variant: 'variable',
  },
  id11: {
    id: 'id11',
    kind: 'variable',
    name: 'Variable 10',
    color: defaultColors.copper,
    variant: 'variable',
  },
  id12: {
    id: 'id12',
    kind: 'variable',
    name: 'Variable 12',
    color: defaultColors.havelock,
    variant: 'variable',
  },
  id13: {
    id: 'id13',
    kind: 'variable',
    name: 'Variable 13',
    color: defaultColors.neutral,
    variant: 'variable',
  },
} as Record<string, IVariableEntityCode>;
