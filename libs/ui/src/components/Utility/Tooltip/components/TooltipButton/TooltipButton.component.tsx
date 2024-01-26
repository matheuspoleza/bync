import { clsx } from '@bync/style';

import type { IButton } from '@/components/Buttons';
import { Button } from '@/components/Buttons';

import { tooltipButtonStyles } from './TooltipButton.css';

export const TooltipButton: React.FC<IButton> = (props) => (
  <Button
    {...props}
    size={props.size ?? 'medium'}
    variant={props.variant ?? 'themedDefault'}
    fullWidth
    className={clsx(props.className, tooltipButtonStyles)}
  />
);
