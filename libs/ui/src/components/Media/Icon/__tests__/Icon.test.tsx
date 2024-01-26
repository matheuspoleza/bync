import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { IIcon } from '../Icon.component';
import { Icon } from '../Icon.component';

describe('Icon', () => {
  const component = (props?: Partial<IIcon>) => {
    const testID = 'test-id';

    const { getByTestId } = render(<Icon name="Copy" testID={testID} {...props} />);

    return {
      icon: getByTestId(testID),
    };
  };

  it('renders', () => {
    const { icon } = component();

    expect(icon).toBeInTheDocument();
  });

  it('attaches correct className', () => {
    const className = 'test-classs';
    const { icon } = component({ className });

    expect(icon).toHaveAttribute('class', className);
  });
});
