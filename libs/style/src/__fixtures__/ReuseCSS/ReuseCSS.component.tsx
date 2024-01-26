import type { ButtonProps } from '../Button';
import { base } from './ReuseCSS.css';

export const ReuseCSS: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button className={base} onClick={onClick}>
    {children}
  </button>
);
