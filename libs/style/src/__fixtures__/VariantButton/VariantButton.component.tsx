import type { ButtonProps } from '../Button';
import type { variants } from './VariantButton.css';
import * as S from './VariantButton.styled';

export interface VariantButtonProps extends ButtonProps {
  variant: keyof typeof variants;
}

export const VariantButton: React.FC<VariantButtonProps> = ({ variant, onClick, children }) => (
  <S.Base variant={variant} onClick={onClick}>
    {children}
  </S.Base>
);
