import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { StatusIndicator } from '../StatusIndicator.component';
import type { IStatusIndicator } from '../types';

describe('StatusIndicator', () => {
  const component = ({ status }: IStatusIndicator) => {
    const testID = 'test-id';
    const { getByTestId } = render(<StatusIndicator testID={testID} status={status} />);

    return {
      statusIndicator: getByTestId(testID),
    };
  };

  it('renders the right variant of status', ({ expect }) => {
    const { statusIndicator } = component({ status: 'in-progress' });
    expect(statusIndicator).toHaveStyle('background-color: rgb(91, 159, 215)');
  });
});
