import { DragVert } from '@bync/icons';
import { clsx } from '@bync/style';

import { dragButtonStyles, iconStyles } from './DragButton.css';
import type { IDragButton } from './DragButton.interface';

// TODO add horizontal variance when the need comes && move this to ActionButtons/
export const DragButton: React.FC<IDragButton> = ({ testID, isActive, isHovering, className, ...props }) => (
  <button {...props} data-testid={testID} className={clsx(dragButtonStyles({ isActive, isHovering }), className)}>
    <DragVert className={iconStyles} />
  </button>
);
