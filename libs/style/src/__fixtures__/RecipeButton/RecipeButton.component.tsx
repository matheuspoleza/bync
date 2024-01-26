import type { VariantProps } from '@/main';

import type { ButtonProps } from '../Button';
import type { complex } from './RecipeButton.css';
import * as S from './RecipeButton.styled';

export interface RecipeButtonProps extends ButtonProps, VariantProps<typeof complex> {}

export const RecipeButton: React.FC<RecipeButtonProps> = ({ color, fontSize, onClick, children }) => (
  <S.Base variants={{ color, fontSize }} onClick={onClick}>
    {children}
  </S.Base>
);
