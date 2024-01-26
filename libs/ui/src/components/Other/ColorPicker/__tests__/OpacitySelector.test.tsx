import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { IOpacitySelector } from '../OpacitySelector/OpacitySelector.component';
import { OpacitySelector } from '../OpacitySelector/OpacitySelector.component';

describe('OpacitySelector', () => {
  const component = (props: IOpacitySelector) => {
    const testID = 'test-id';

    const [onValueChange, Controlled] = mockFormControl(OpacitySelector, 0);
    const { getAllByTestId } = render(<Controlled testID={testID} {...props} />);
    return {
      slider: getAllByTestId(testID)[0],
      onValueChange,
    };
  };

  it('renders', () => {
    global.ResizeObserver = ResizeObserver;
    const { slider } = component({ value: 1, onValueChange: () => null });

    expect(slider).toBeInTheDocument();
  });
});
