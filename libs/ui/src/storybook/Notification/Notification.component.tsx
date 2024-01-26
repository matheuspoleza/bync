import { useEffect } from 'react';

import { Portal, Text } from '@/components';

import { notificationStyles } from './Notification.css';

export interface INotification extends React.PropsWithChildren {
  onClose: () => void;
}

export const Notification: React.FC<INotification> = ({ onClose, children }) => {
  useEffect(() => {
    const timeout = setTimeout(() => onClose(), 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Portal>
      <dialog className={notificationStyles} open>
        <Text>{children}</Text>
      </dialog>
    </Portal>
  );
};
