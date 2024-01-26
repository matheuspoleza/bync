import { ActionButton } from './ActionButton';
import { ActionButtons as ActionButtonComponent } from './ActionButtons.component';

export type { IActionButton } from './ActionButton';
export type { IActionButtons } from './types';

export const ActionButtons = Object.assign(ActionButtonComponent, { Button: ActionButton });
