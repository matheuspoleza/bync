import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import type { IButton } from '@/components/Buttons/Button';

import { ModalFooterButton } from '../components/ModalFooterButton';
import { ModalFooterCheckbox } from '../components/ModalFooterCheckbox';
import type { IModalFooter } from '../ModalFooter.component';
import { ModalFooter } from '../ModalFooter.component';

const TEST_ID = 'test-id';

const getMockButtonProps = (label: string) => {
  const onClick = vi.fn();

  return {
    label,
    onClick,
  };
};
const getChildrenFixture = (primaryButtonProps?: IButton, secondaryButtonProps?: IButton) => (
  <>
    <ModalFooterButton {...secondaryButtonProps} label="Close" variant="secondary" testID={TEST_ID} />
    <ModalFooterButton {...primaryButtonProps} label="Agree" variant="primary" testID={TEST_ID} />
  </>
);

describe.concurrent('ModalFooter', () => {
  const component = (props: IModalFooter) => {
    const { getByTestId, queryByTestId } = render(<ModalFooter {...props} testID={TEST_ID} />);
    return {
      footer: getByTestId(`${TEST_ID}--modal-footer`),
      checkbox: queryByTestId(`${TEST_ID}--footer-checkbox`),
      primaryButton: queryByTestId(`${TEST_ID}--primary-footer-button`),
      secondaryButton: queryByTestId(`${TEST_ID}--secondary-footer-button`),
    };
  };

  it('should render successfully', ({ expect }) => {
    const { footer, primaryButton, secondaryButton } = component({
      children: getChildrenFixture(),
    });

    expect(footer).toBeInTheDocument();

    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  it('should trigger button handlers on click', ({ expect }) => {
    const primaryButtonProps = getMockButtonProps('Agree');
    const secondaryButtonProps = getMockButtonProps('close');
    const { primaryButton, secondaryButton } = component({
      children: getChildrenFixture(primaryButtonProps, secondaryButtonProps),
    });

    userEvent.click(primaryButton!);
    userEvent.click(secondaryButton!);
    expect(primaryButtonProps.onClick).toHaveBeenCalled();
    expect(secondaryButtonProps.onClick).toHaveBeenCalled();
  });

  it('should render checkbox when Checkbox is passed and trigger onChange on click', ({ expect }) => {
    const onChange = vi.fn();
    const { checkbox } = component({
      checkbox: <ModalFooterCheckbox testID={TEST_ID} value={false} label="Checkbox" onChange={onChange} />,
    });

    userEvent.click(checkbox!);

    expect(checkbox).toBeInTheDocument();
    expect(onChange).toHaveBeenCalled();
  });

  it('should render an emtpy footer when no props are passed', ({ expect }) => {
    const { footer, primaryButton, secondaryButton, checkbox } = component({});

    expect(footer).toBeInTheDocument();
    expect(primaryButton).not.toBeInTheDocument();
    expect(secondaryButton).not.toBeInTheDocument();
    expect(checkbox).not.toBeInTheDocument();
  });
});
