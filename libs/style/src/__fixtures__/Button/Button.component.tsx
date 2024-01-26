import * as S from './Button.styled';

export interface ButtonProps extends React.PropsWithChildren {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => <S.Base onClick={onClick}>{children}</S.Base>;
