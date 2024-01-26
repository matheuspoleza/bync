import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { ModalHeaderLeftButton } from '../components/ModalHeaderLeftButton';
import { ModalHeaderSecondaryButton } from '../components/ModalHeaderSecondaryButton';
import type { IModalHeader } from '../ModalHeader.component';
import { ModalHeader } from '../ModalHeader.component';

const TEST_ID = 'test-id';

describe.concurrent('ModalHeader', () => {
  const component = (props?: Omit<IModalHeader, 'title' | 'onClose'>) => {
    const title = 'Modal Header';
    const onClose = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <ModalHeader testID={TEST_ID} title={title} onClose={onClose} {...props} />
    );

    return {
      onClose,
      header: getByTestId(`${TEST_ID}--modal-header`),
      title: getByTestId(`${TEST_ID}--modal-title`),
      leftButton: queryByTestId(`${TEST_ID}--modal-header-left-button`),
      moreButton: queryByTestId(`${TEST_ID}--modal-header-button`),
      closeButton: getByTestId(`${TEST_ID}--close-button`),
    };
  };

  it('should render title successfully', ({ expect }) => {
    const { header, leftButton, moreButton, title } = component();

    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    expect(leftButton).not.toBeInTheDocument();
    expect(moreButton).not.toBeInTheDocument();
  });

  it('should render buttons when corresponding callbacks are passed and trigger them on click', ({ expect }) => {
    const onMenuButtonClick = vi.fn();
    const onMoreButtonClick = vi.fn();
    const { leftButton, moreButton } = component({
      leftButton: <ModalHeaderLeftButton onClick={onMenuButtonClick} iconName="Menu" testID={TEST_ID} />,
      secondaryButton: <ModalHeaderSecondaryButton onClick={onMoreButtonClick} iconName="More" testID={TEST_ID} />,
    });

    userEvent.click(leftButton!);
    userEvent.click(moreButton!);

    expect(leftButton).toBeInTheDocument();
    expect(moreButton).toBeInTheDocument();
    expect(onMenuButtonClick).toHaveBeenCalled();
    expect(onMoreButtonClick).toHaveBeenCalled();
  });

  it('should trigger onClose handler on click', ({ expect }) => {
    const { closeButton, onClose } = component();

    userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
