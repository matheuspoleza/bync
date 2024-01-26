import type { ButtonProps } from '../Button';
import * as S from './InlineVarButton.styled';

export interface InlineVarButtonProps extends ButtonProps {
  brandColor: string;
}

export const InlineVarButton: React.FC<InlineVarButtonProps> = ({ brandColor, onClick, children }) => (
  <S.Base onClick={onClick} vars={{ brandColor }}>
    {children}
  </S.Base>
);
