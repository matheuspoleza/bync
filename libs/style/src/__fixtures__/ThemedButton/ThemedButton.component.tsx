import type { ButtonProps } from '../Button';
import * as S from './ThemedButton.styled';

export const ThemedButton: React.FC<ButtonProps> = ({ onClick, children }) => (
  <S.Base onClick={onClick}>{children}</S.Base>
);
