import { ModalContainer as Container } from './ModalContainer/ModalContainer.component';
import { ModalFooter as Footer } from './ModalFooter';
import { ModalHeader as Header } from './ModalHeader';

export type { IModalContainer } from './ModalContainer';
export type { IModalFooter } from './ModalFooter';
export type { IModalHeader } from './ModalHeader';

export const Modal = { Header, Footer, Container };
