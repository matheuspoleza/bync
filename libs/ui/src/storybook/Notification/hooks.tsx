import { createRoot } from 'react-dom/client';

import { Notification } from './Notification.component';

export const notify = (message: React.ReactNode) => {
  const host = document.createElement('div');
  document.body.appendChild(host);

  const root = createRoot(host);
  const handleClose = () => {
    root.unmount();
    document.body.removeChild(host);
  };
  root.render(<Notification onClose={handleClose}>{message}</Notification>);
};
