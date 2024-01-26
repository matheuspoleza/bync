import { ModalHeaderLeftButton } from './components/ModalHeaderLeftButton';
import { ModalHeaderSecondaryButton } from './components/ModalHeaderSecondaryButton';
import { ModalHeader as Container } from './ModalHeader.component';

export type { IModalHeader } from './ModalHeader.component';

export const ModalHeader = Object.assign(Container, {
  SecondaryButton: ModalHeaderSecondaryButton,
  LeftButton: ModalHeaderLeftButton,
  displayName: 'Modal.Header',
});
