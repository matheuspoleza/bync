import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { ActionButton } from '../ActionButton';
import { ActionButtons } from '../ActionButtons.component';
import type { IActionButtons } from '../types';

const firstButtonLabel = 'first-button-label';
const secondButtonLabel = 'second-button-label';

describe('ActionButtons', () => {
  const component = (props?: Partial<IActionButtons>) => {
    const testID = 'test-id';
    const firstButtonOnClick = vi.fn();
    const secondButtonOnClick = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <ActionButtons
        firstButton={
          <ActionButton label={firstButtonLabel} onClick={firstButtonOnClick} testID={`${testID}-first-button`} />
        }
        secondButton={
          <ActionButton label={secondButtonLabel} onClick={secondButtonOnClick} testID={`${testID}-second-button`} />
        }
        testID={testID}
        {...props}
      />
    );

    return {
      buttons: getByTestId(testID),
      firstButton: getByTestId(`${testID}-first-button`),
      firstLabel: getByTestId(`${testID}-first-button--label`),
      secondButton: queryByTestId(`${testID}-second-button`),
      secondLabel: queryByTestId(`${testID}-second-button--label`),
      firstButtonOnClick,
      secondButtonOnClick,
    };
  };

  it('renders', () => {
    const { buttons } = component();
    expect(buttons).toBeInTheDocument();
  });

  it('shows correct labels', () => {
    const { firstLabel, secondLabel } = component();

    expect(firstLabel.textContent).toBe(firstButtonLabel);
    expect(secondLabel?.textContent).toBe(secondButtonLabel);
  });

  it('calls handles the callbacks correctly', () => {
    const { firstButton, secondButton, firstButtonOnClick, secondButtonOnClick } = component();

    firstButton.click();
    expect(firstButtonOnClick).toHaveBeenCalled();

    secondButton?.click();
    secondButton?.click();
    expect(secondButtonOnClick).toBeCalledTimes(2);
  });
});
