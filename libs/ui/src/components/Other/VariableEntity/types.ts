import type { VariantProps } from '@bync/style';

import type { textRecipe } from './Variable/styles/Variable.css';

export interface IVariableEntity extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof textRecipe> {
  color?: string;
  label: string;
  maxWidth?: string;
  testID?: string;
}
