import type { SVGProps } from 'react';

import { hiddenBracketStyle } from './Brackets.css';

interface IBracket extends SVGProps<SVGSVGElement> {
  bracketBorderClassName: string;
  borderPaddingClassName?: string;
}

export const BracketLeft: React.FC<IBracket> = ({ className, bracketBorderClassName, borderPaddingClassName }) => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="8 4 8 16" className={className}>
      <path
        className={bracketBorderClassName}
        fillRule="evenodd"
        d="M14.31 12.5c.123.315.188.654.188 1v1.3a2.75 2.75 0 0 1-1.25 5.2h-.5a3.75 3.75 0 0 1-3.75-3.75v-1.405a3.254 3.254 0 0 1 0-4.69V8.75A3.75 3.75 0 0 1 12.748 5h.5a2.75 2.75 0 0 1 1.25 5.2v1.3c0 .346-.065.685-.188 1Zm-2.125 5.407c.176.06.366.093.563.093h.5a.75.75 0 1 0 0-1.5h-.5a.25.25 0 0 1-.25-.25V13.5a.751.751 0 0 0-.3-.6l-.532-.4.533-.4a.751.751 0 0 0 .299-.6V8.75a.25.25 0 0 1 .25-.25h.5a.75.75 0 1 0 0-1.5h-.5a1.748 1.748 0 0 0-1.75 1.75v2.38l-.5.37c-.664.5-.664 1.5 0 2l.5.37v2.38c0 .77.497 1.423 1.187 1.657Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        className={borderPaddingClassName}
        fillRule="evenodd"
        d="M12.426 13.18a.75.75 0 0 0-.227-.28l-.533-.4.533-.4a.75.75 0 0 0 .3-.6V8.75a.25.25 0 0 1 .25-.25h.499a.75.75 0 0 0 0-1.5h-.5a1.75 1.75 0 0 0-1.75 1.75v2.38l-.5.37c-.664.5-.664 1.5 0 2l.5.37v2.38c0 .966.784 1.75 1.75 1.75h.5a.75.75 0 0 0 0-1.5h-.5a.25.25 0 0 1-.25-.25V13.5a.752.752 0 0 0-.072-.32Zm-2.428 1.194-.1-.075a2.252 2.252 0 0 1 0-3.598l.005-.004.095-.07V8.75A2.75 2.75 0 0 1 12.748 6h.5a1.75 1.75 0 0 1 .25 3.482V11.5c0 .361-.112.71-.313 1 .201.29.313.639.313 1v2.018a1.75 1.75 0 0 1-.25 3.482h-.5a2.75 2.75 0 0 1-2.75-2.75v-1.876Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M10.998 8.75c0-.967.784-1.75 1.75-1.75h.5a.75.75 0 1 1 0 1.5h-.5a.25.25 0 0 0-.25.25v2.75c0 .236-.11.458-.3.6l-.532.4.533.4a.752.752 0 0 1 .299.6v2.75c0 .138.112.25.25.25h.5a.75.75 0 1 1 0 1.5h-.5a1.75 1.75 0 0 1-1.75-1.75v-2.38l-.5-.37c-.664-.5-.664-1.5 0-2l.5-.37V8.75Z"
        clipRule="evenodd"
      />
    </svg>
    <span className={hiddenBracketStyle}>{'{'}</span>
  </>
);

export const BracketRight: React.FC<IBracket> = ({ className, bracketBorderClassName, borderPaddingClassName }) => (
  <>
    <span className={hiddenBracketStyle}>{'}'}</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="8 4 8 16" className={className}>
      <path
        className={bracketBorderClassName}
        fillRule="evenodd"
        d="M9.688 12.5a2.75 2.75 0 0 0-.188 1v1.3a2.75 2.75 0 0 0 1.25 5.2h.5A3.75 3.75 0 0 0 15 16.25v-1.405a3.254 3.254 0 0 0 0-4.69V8.75A3.75 3.75 0 0 0 11.25 5h-.5a2.75 2.75 0 0 0-1.25 5.2v1.3c0 .346.065.685.188 1Zm2.125 5.407a1.75 1.75 0 0 1-.563.093h-.5a.75.75 0 0 1 0-1.5h.5a.25.25 0 0 0 .25-.25V13.5c0-.236.11-.458.3-.6l.532-.4-.533-.4a.751.751 0 0 1-.299-.6V8.75a.25.25 0 0 0-.25-.25h-.5a.75.75 0 1 1 0-1.5h.5A1.748 1.748 0 0 1 13 8.75v2.38l.5.37c.664.5.664 1.5 0 2l-.5.37v2.38a1.75 1.75 0 0 1-1.187 1.657Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        className={borderPaddingClassName}
        fillRule="evenodd"
        d="M11.572 13.18a.75.75 0 0 1 .227-.28l.533-.4-.533-.4a.75.75 0 0 1-.299-.6V8.75a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.783 1.75 1.75v2.38l.5.37c.664.5.664 1.5 0 2l-.5.37v2.38A1.75 1.75 0 0 1 11.25 18h-.5a.75.75 0 0 1 0-1.5h.5a.25.25 0 0 0 .25-.25V13.5c0-.112.025-.221.072-.32ZM14 14.374l.1-.075a2.252 2.252 0 0 0 0-3.598l-.005-.004-.095-.07V8.75A2.75 2.75 0 0 0 11.25 6h-.5a1.75 1.75 0 0 0-.25 3.482V11.5c0 .361.112.71.314 1-.202.29-.314.639-.314 1v2.018A1.75 1.75 0 0 0 10.75 19h.5A2.75 2.75 0 0 0 14 16.25v-1.876Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M13 8.75A1.75 1.75 0 0 0 11.25 7h-.5a.75.75 0 1 0 0 1.5h.5a.25.25 0 0 1 .25.25v2.75c0 .236.11.458.3.6l.532.4-.533.4a.751.751 0 0 0-.299.6v2.75a.25.25 0 0 1-.25.25h-.5a.75.75 0 0 0 0 1.5h.5A1.75 1.75 0 0 0 13 16.25v-2.38l.5-.37c.664-.5.664-1.5 0-2l-.5-.37V8.75Z"
        clipRule="evenodd"
      />
    </svg>
  </>
);
