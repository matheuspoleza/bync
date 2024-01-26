import { ConfirmInput as ConfirmInputComponent } from './ConfirmInput.component';
import { ConfirmInputButton } from './ConfirmInputButton/ConfirmInputButton.component';

export const ConfirmInput = Object.assign(ConfirmInputComponent, {
  Button: ConfirmInputButton,
});
