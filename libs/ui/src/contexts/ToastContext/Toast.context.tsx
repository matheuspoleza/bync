import React from 'react';
import type { Id, ToastContentProps, ToastOptions } from 'react-toastify';
import * as Toast from 'react-toastify';

import { Portal } from '@/components/Utility/Portal/Portal.component';

import type { IToast } from '../../components/Feedback/Toast';
import { Toast as ToastComponent } from '../../components/Feedback/Toast/Toast.component';
import {
  inAnimationClass,
  outAnimationClass,
  toastBodyStyles,
  toastQueueContainerStyles,
  toastStyles,
} from './ToastContext.css';

export interface ICustomOptions extends Omit<IToast, 'className' | 'text' | 'style' | 'testId'> {}
export type Options = Omit<ToastOptions, 'type' | 'hideProgressBar' | 'position'> & ICustomOptions;
export type ToastRenderFunc = (message: IToast['text'], options?: Options) => Id;
type ToastMethod = (toastComponent: ({ closeToast }: ToastContentProps) => JSX.Element, options: Options) => void;

export type ToastNamespace = typeof Toast.toast & {
  genericError: () => Id;
  info: ToastRenderFunc;
  success: ToastRenderFunc;
  error: ToastRenderFunc;
  warning: ToastRenderFunc;
};

const withMethod =
  (method: ToastMethod) =>
  (
    message: IToast['text'],
    { variant, isClosable, showIcon, actionButtonProps, onClose, isLoading, ...options }: Options
  ) => {
    return method(
      ({ closeToast }: ToastContentProps) => (
        <ToastComponent
          text={message}
          isClosable={isClosable}
          showIcon={showIcon}
          isLoading={isLoading}
          actionButtonProps={actionButtonProps}
          variant={variant}
          onClose={() => {
            closeToast?.();
            onClose?.();
          }}
        />
      ),
      options
    );
  };

const toast = withMethod(Toast.toast) as ToastNamespace;

// extend the options to include component props
// override methods to use the component
Object.assign(toast, {
  info: (message: IToast['text'], options: Options) =>
    withMethod(Toast.toast.info)(message, { ...options, variant: 'default' }),
  success: (message: IToast['text'], options: Options) =>
    withMethod(Toast.toast.success)(message, { ...options, variant: 'success' }),
  warning: (message: IToast['text'], options: Options) =>
    withMethod(Toast.toast.warning)(message, { ...options, variant: 'alert' }),
  error: (message: IToast['text'], options: Options) =>
    withMethod(Toast.toast.error)(message, { ...options, variant: 'alert' }),
  genericError: () => withMethod(Toast.toast.error)('Something went wrong. Please try again', { variant: 'alert' }),
  dismiss: (id: Id) => Toast.toast.dismiss(id),
});

export { toast };

export const ToastContainer = () => (
  <Portal portalNode={globalThis.document.body}>
    <Toast.ToastContainer
      newestOnTop
      hideProgressBar
      bodyClassName={toastBodyStyles}
      toastClassName={toastStyles}
      icon={false}
      closeOnClick={false}
      className={toastQueueContainerStyles}
      position="bottom-center"
      autoClose={3000}
      closeButton={false}
      draggable={false}
      pauseOnFocusLoss={false}
      pauseOnHover={true}
      transition={Toast.cssTransition({
        enter: inAnimationClass,
        exit: outAnimationClass,
      })}
    />
  </Portal>
);
