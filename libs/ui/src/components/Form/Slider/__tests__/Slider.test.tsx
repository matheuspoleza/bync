import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { ISlider } from '../Slider.component';
import { Slider } from '../Slider.component';
import { snapToClosestMark } from '../utils';

describe('Slider', () => {
  const component = (props: Partial<ISlider>, defaultState = 0) => {
    const testID = 'slider-0';
    const startLabel = 'Low';
    const endLabel = 'High';
    const [onValueChange, Controlled] = mockFormControl(Slider, defaultState);

    window.ResizeObserver = ResizeObserver;

    const { getByText, getByTestId } = render(
      <Controlled testID={testID} startLabel={startLabel} endLabel={endLabel} {...props} />
    );

    return {
      onValueChange,
      getByText,
      slider: getByTestId(`${testID}--slider-container`),
    };
  };

  it('should render both labels', ({ expect }) => {
    const startLabel = 'A';
    const endLabel = 'Z';

    const { getByText } = component({ startLabel, endLabel });

    const labelLeft = getByText(startLabel);
    const labelRight = getByText(endLabel);

    expect(labelLeft).toBeInTheDocument();
    expect(labelRight).toBeInTheDocument();
  });

  it('should snap to closest mark via snapToClosestMark util', ({ expect }) => {
    const marks = [0, 50, 80, 100];
    const snappedValue50 = snapToClosestMark(marks, 30);
    const snappedValue80 = snapToClosestMark(marks, 90);
    const snappedValue100 = snapToClosestMark(marks, 97);

    expect(snappedValue50).toBe(50);
    expect(snappedValue80).toBe(80);
    expect(snappedValue100).toBe(100);
  });

  it('should return a value between 0 and 100 if the value is outside of the range', ({ expect }) => {
    const zeroValue = snapToClosestMark([0, 100], -10);

    expect(zeroValue).toBe(0);
  });
});
