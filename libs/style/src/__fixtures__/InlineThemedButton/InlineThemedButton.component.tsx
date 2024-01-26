import type { ButtonProps } from '../Button';
import * as Theme from '../theme.css';
import * as S from './InlineThemedButton.styled';

export interface InlineThemedButtonProps extends ButtonProps {
  brandColor: string;
}

export const InlineThemedButton: React.FC<InlineThemedButtonProps> = ({ brandColor, onClick, children }) => (
  <S.Base onClick={onClick} theme={{ color: { brand: brandColor }, spacing: Theme.spacing }}>
    {children}
  </S.Base>
);
