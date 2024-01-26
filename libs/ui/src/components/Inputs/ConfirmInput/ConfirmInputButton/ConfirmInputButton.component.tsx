import { Button } from '@/components/Buttons';

import { buttonStyle } from './ConfirmInputButton.css';
import type { IConfirmInputButton } from './ConfirmInputButton.interface';

export const ConfirmInputButton = ({ isLoading, disabled, ...props }: IConfirmInputButton) => (
  <Button className={buttonStyle} fullWidth {...props} isLoading={isLoading} disabled={disabled} />
);
