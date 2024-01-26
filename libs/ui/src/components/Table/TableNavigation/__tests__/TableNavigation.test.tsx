import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { TableNavigation } from '../TableNavigation.component';
import type { ITableNavigation } from '../types';

describe.concurrent('TableNavigation', () => {
  const component = (props: ITableNavigation) => {
    const testID = 'test-id';

    const { getByTestId } = render(<TableNavigation testID={testID} {...props} />);

    return {
      tableNavigation: getByTestId(testID),
    };
  };

  it('should render', ({ expect }) => {
    const { tableNavigation } = component({
      breadCrumbsItems: [{ label: 'Agent Name' }, { label: 'All Intents (0)' }],
    });

    expect(tableNavigation).toBeInTheDocument();
  });
});
