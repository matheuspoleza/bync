import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { IUpdatesIndicator } from '../UpdatesIndicator.component';
import { UpdatesIndicator } from '../UpdatesIndicator.component';

describe.concurrent('UpdatesIndicator', () => {
  const component = (props: IUpdatesIndicator) => {
    const id = 'indicator-01';
    const { getByTestId } = render(<UpdatesIndicator {...props} testID={id} />);
    return { indicator: getByTestId(`${id}--indicator`) };
  };

  it('should render label', ({ expect }) => {
    const { indicator } = component({ label: '2' });
    expect(indicator).toHaveTextContent('2');
  });
});
