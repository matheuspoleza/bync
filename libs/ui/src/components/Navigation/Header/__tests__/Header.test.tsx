import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { IHeader } from '@/components/Navigation/Header';
import { Header } from '@/components/Navigation/Header';

describe('Header', () => {
  const component = (props?: Partial<IHeader>) => {
    const testID = 'test-id';

    const { getByTestId } = render(
      <Header testID={testID} {...props}>
        <div>test</div>
      </Header>
    );

    return {
      header: getByTestId(testID),
    };
  };

  it('should render successfully', ({ expect }) => {
    const { header } = component();

    expect(header).toBeInTheDocument();
  });

  it('should render correct style for basic variant', ({ expect }) => {
    const { header } = component({ variant: 'default' });

    expect(header).toHaveStyle({ paddingLeft: '8px' });
  });

  it('should render correct style for search variant', ({ expect }) => {
    const { header } = component({ variant: 'search' });

    expect(header).toHaveStyle({ paddingLeft: '20px' });
  });

  it('should render correct style for buttons variant', ({ expect }) => {
    const { header } = component({ variant: 'buttons' });

    expect(header).toHaveStyle({ paddingLeft: '12px' });
  });
});
