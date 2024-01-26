import type { ICheckboxControl } from '@/components/Form/CheckboxControl';
import { CheckboxControl } from '@/components/Form/CheckboxControl';

export const ModalFooterCheckbox: React.FC<ICheckboxControl> = ({ testID, ...props }) => {
  return <CheckboxControl {...props} testID={`${testID}--footer-checkbox`} />;
};
