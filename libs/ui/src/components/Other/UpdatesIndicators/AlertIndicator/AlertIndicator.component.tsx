import type { IUpdatesIndicator } from '../UpdatesIndicator.component';
import { UpdatesIndicator } from '../UpdatesIndicator.component';

export type IAlertIndicator = Omit<IUpdatesIndicator, 'variant' | 'label'>;

export const AlertIndicator: React.FC<IAlertIndicator> = (props) => {
  return (
    <UpdatesIndicator {...props} variant="alert">
      {props.children}
    </UpdatesIndicator>
  );
};
