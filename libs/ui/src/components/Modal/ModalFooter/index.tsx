import { ModalFooterButton } from './components/ModalFooterButton';
import { ModalFooterCheckbox } from './components/ModalFooterCheckbox';
import { ModalFooter as Component } from './ModalFooter.component';

export type { IModalFooter } from './ModalFooter.component';

export const ModalFooter = Object.assign(Component, {
  Checkbox: ModalFooterCheckbox,
  Button: ModalFooterButton,
  displayName: 'Modal.Footer',
});
