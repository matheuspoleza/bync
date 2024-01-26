import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Mapper } from '@/components/Other/Mapper';

import type { IMapper } from '../types';

describe('Mapper', () => {
  const component = (props?: IMapper) => {
    const testID = 'test-id';
    const leftHandSide = 'left-hand-side';
    const rightHandSide = 'right-hand-side';

    const { queryByText } = render(
      <Mapper {...props} leftHandSide={leftHandSide} rightHandSide={rightHandSide} testID={testID} />
    );

    return {
      leftHandSide: queryByText(leftHandSide),
      rightHandSide: queryByText(rightHandSide),
    };
  };

  it('render the Mapper component with a proper left and right hand sides', () => {
    const { leftHandSide, rightHandSide } = component();

    expect(leftHandSide).toBeInTheDocument();
    expect(rightHandSide).toBeInTheDocument();
  });
});
