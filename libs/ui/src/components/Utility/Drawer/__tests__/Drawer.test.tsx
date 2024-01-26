import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Box } from '../../Box';
import { Drawer } from '../Drawer.component';
import type { IDrawer } from '../types';

describe.concurrent('Drawer', () => {
  const component = (props?: Partial<IDrawer>) => {
    const testID = 'test-id';
    const childTestID = 'child-test-id';
    const { getByTestId, queryByTestId } = render(
      <Drawer isOpen={false} testID={testID} {...props}>
        <Box testID={childTestID}>howdy</Box>
      </Drawer>
    );

    return {
      drawer: getByTestId(testID),
      children: queryByTestId(childTestID),
    };
  };

  it('should render successfully', ({ expect }) => {
    const { drawer } = component();

    expect(drawer).toBeInTheDocument();
  });

  it('render at correct position when closed', ({ expect }) => {
    const { drawer } = component();

    const styles = window.getComputedStyle(drawer);
    const got = styles.getPropertyValue('right');

    const want = '-350px';
    expect(got).toEqual(want);
  });

  it('render at correct position when open', ({ expect }) => {
    const { drawer } = component({ isOpen: true });

    const styles = window.getComputedStyle(drawer);

    const got = styles.getPropertyValue('right');
    const want = '0px';
    expect(got).toEqual(want);
  });

  it('doesnt render children when closed', ({ expect }) => {
    const { children } = component();

    expect(children).not.toBeInTheDocument();
  });

  it('renders children when open', ({ expect }) => {
    const { children } = component({ isOpen: true });

    expect(children).toBeInTheDocument();
  });
});
