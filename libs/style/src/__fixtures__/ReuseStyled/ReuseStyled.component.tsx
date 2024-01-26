import type { ButtonProps } from '../Button';
import * as S from './ReuseStyled.styled';

export const ReuseStyled: React.FC<ButtonProps> = ({ onClick, children }) => (
  <S.Base onClick={onClick}>{children}</S.Base>
);
