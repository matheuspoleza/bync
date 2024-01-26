import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { describe, it } from 'vitest';

import { TwoLineInput } from '../TwoLineInput.component';
import type { ITwoLineInput } from '../types';

describe.concurrent('TwoLineInput', () => {
  const component = (props?: Partial<ITwoLineInput>) => {
    const testID = 'test-id';

    const { getByTestId } = render(
      <TwoLineInput {...props} testID={testID} firstLineProps={{ value: '' }} secondLineProps={{ value: '' }} />
    );
    return {
      twoLineInput: getByTestId(testID),
      firstLine: getByTestId(`${testID}--first-line`),
      secondLine: getByTestId(`${testID}--second-line`),
    };
  };

  it('renders', ({ expect }) => {
    const { twoLineInput } = component();
    expect(twoLineInput).toBeInTheDocument();
  });

  it('hides second line on default', ({ expect }) => {
    const { secondLine } = component({ hideSecondLineOnBlur: true });
    expect(secondLine).not.toBeVisible();
  });

  it('shows second line on focus of the first input', ({ expect }) => {
    const { firstLine, secondLine } = component({ hideSecondLineOnBlur: true });
    act(() => {
      firstLine.focus();
    });

    expect(secondLine).toBeVisible();
  });
});
