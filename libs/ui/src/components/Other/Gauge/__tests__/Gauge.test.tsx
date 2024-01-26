import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Gauge } from '../Gauge.component';
import type { IGauge } from '../types';

describe('Gauge', () => {
  const component = (props: IGauge) => {
    const testID = 'test-id';
    const { getByTestId } = render(<Gauge testID={testID} {...props} />);

    return {
      gauge: getByTestId(testID),
    };
  };

  it('renders', ({ expect }) => {
    const { gauge } = component({ progress: 24, level: 'low' });
    expect(gauge).toBeInTheDocument();
  });
});
