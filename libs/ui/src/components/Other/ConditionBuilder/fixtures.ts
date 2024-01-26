import { SlateEditor } from '@/components/Inputs';

export const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'variable',
    name: 'Variable 1',
    color: 'fern',
    icon: 'icon',
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id2: {
    id: 'id2',
    kind: 'variable',
    name: 'Variable 2',
    color: 'copper',
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id3: {
    id: 'id3',
    kind: 'variable',
    name: 'Variable 3',
    color: 'havelock',
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id4: {
    id: 'id4',
    kind: 'variable',
    name: 'Variable 4',
    color: 'hibiscus',
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id5: {
    id: 'id5',
    kind: 'variable',
    name: 'members',
    color: 'fern',
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id6: {
    id: 'id6',
    kind: 'variable',
    name: 'sessions',
    color: 'copper',
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
} as const;

export enum CONDITION_OPERATION {
  IS = 'is',
  IS_NOT = 'is_not',

  GREATER_THAN = 'greater_than',
  GREATER_OR_EQUAL = 'greater_or_equal',
  LESS_THAN = 'less_than',
  LESS_OR_EQUAL = 'less_or_equal',

  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
}

export const conditionsList = Object.values(CONDITION_OPERATION).map((value: string) => ({
  label: value.split('_').join(' '),
}));

export const DEFAULT_LEFT_VALUE = [
  {
    children: [
      {
        type: SlateEditor.ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id2',
        variableVariant: SlateEditor.VariableElementVariant.VARIABLE,
      },
      { text: ' ' },
      { text: '* 2' },
    ],
  },
];

export const DEFAULT_RIGHT_VALUE = [
  {
    children: [
      {
        type: SlateEditor.ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id3',
        variableVariant: SlateEditor.VariableElementVariant.VARIABLE,
      },
    ],
  },
];
