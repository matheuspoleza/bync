import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export interface IPortal extends PropsWithChildren {
  portalNode?: HTMLElement | null;
}

// eslint-disable-next-line xss/no-mixed-html
export const rootNode = (globalThis.document?.querySelector('#app') || globalThis.document?.body) as HTMLElement;

export const Portal: FC<IPortal> = ({ children, portalNode }) =>
  createPortal(children, (portalNode as Element) ?? rootNode);
