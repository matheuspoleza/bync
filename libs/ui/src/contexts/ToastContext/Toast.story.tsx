import type { Meta, StoryObj } from '@storybook/react';
import random from 'lodash/random';

import { Button } from '@/components/Buttons/Button/Button.component';

import type { Options } from './Toast.context';
import { toast, ToastContainer } from './Toast.context';

type ToastDispatchStory = StoryObj<Options & { message: string }>;
type Story = StoryObj<ToastDispatchStory>;

const meta: Meta<Options & { message: string }> = {
  title: 'Feedback/Toast Context',
};

export const Base: Story = {
  args: {
    message: 'Toast description',
    isClosable: false,
  },
  render: ({ message, ...options }) => (
    <>
      <ToastContainer />
      <Button variant="secondary" label="Call a basic toast" onClick={() => toast.info(message, options)} />
    </>
  ),
};

export const WithAction: Story = {
  args: {
    message: 'Toast long long long message here',
    showIcon: false,
    autoClose: false,
    actionButtonProps: {
      label: 'Label',
      onClick: () => console.log('Action button clicked'),
    },
  },
  render: ({ message, ...options }) => (
    <>
      <ToastContainer />
      <Button variant="secondary" label="Call a toast with actions" onClick={() => toast.info(message, options)} />
    </>
  ),
};

export const WithGenericError: Story = {
  args: {
    showIcon: false,
    autoClose: false,
    actionButtonProps: {
      label: 'Label',
      onClick: () => console.log('Action button clicked'),
    },
  },
  render: () => (
    <>
      <ToastContainer />
      <Button variant="secondary" label="Call a toast with actions" onClick={() => toast.genericError()} />
    </>
  ),
};

export const WithCustomizedSuccess: Story = {
  args: {
    showIcon: false,
    autoClose: false,
    actionButtonProps: {
      label: 'Action',
      onClick: () => console.log('Action button clicked'),
    },
  },
  render: () => (
    <>
      <ToastContainer />
      <Button
        variant="secondary"
        label="Call a toast with actions"
        onClick={() => toast.success('Smth good happened', { isClosable: true })}
      />
    </>
  ),
};

export const WithManualDismiss: Story = {
  args: {
    message: 'Toast message',
    showIcon: false,
    autoClose: false,
  },
  render: ({ message, ...options }) => {
    let toastID: any;

    return (
      <>
        <ToastContainer />
        <Button
          variant="primary"
          label="Open toast"
          onClick={() => {
            toastID = toast.info(message, options);
          }}
        />
        <Button variant="alert" label="Close toast" onClick={() => toast.dismiss(toastID)} />
      </>
    );
  },
};

export const Examples: Story = {
  args: {
    message: 'Toast long long long message here',
    showIcon: true,
    isClosable: true,
    actionButtonProps: {
      label: 'Action',
      onClick: () => console.log('Action button clicked'),
    },
  },
  render: ({ message, ...options }) => {
    const onClick = () => {
      const action = ['info', 'error', 'success'][random(0, 2)];
      (toast as any)[action](message, options);
    };

    return (
      <>
        <ToastContainer />
        <Button variant="secondary" label="Call a random type toast" onClick={onClick} />
      </>
    );
  },
};

export default meta;
