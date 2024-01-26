import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { IHueSelector } from '../HueSelector/HueSelector.component';
import { HueSelector } from '../HueSelector/HueSelector.component';

describe('HueSelector', () => {
  const component = (props: IHueSelector) => {
    const testID = 'test-id';

    const [onValueChange, Controlled] = mockFormControl(HueSelector, 1);
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
