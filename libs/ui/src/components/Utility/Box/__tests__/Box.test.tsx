import { render } from '@testing-library/react';

import { Box } from '../Box.component';
import type { IBox } from '../types';

describe('Box component tests', () => {
  const component = (props?: Partial<IBox>) => {
    const testID = 'box-test-id';

    const { getByTestId } = render(<Box testID={testID} {...props} />);

    return {
      box: getByTestId(testID),
    };
  };

  it('should render the right container tag', () => {
    const as = 'section';
    const { box } = component({ as });

    expect(box.tagName.toLowerCase()).toBe(as);
  });

  it('should fall back to div if no container tag is provided', () => {
    const { box } = component();

    expect(box.tagName.toLowerCase()).toBe('div');
  });

  it('should render the children', () => {
    const innerContent = (
      <>
        <section>1</section>
        <section>2</section>
      </>
    );
    const { box } = component({ children: innerContent });

    const children = box.querySelectorAll('section');

    expect(children).toHaveLength(2);
  });

  it('should render the right justify-content property', () => {
    const justify = 'space-between';
    const { box } = component({ justify: justify as 'end' });

    expect(box).toHaveStyle(`justify-content: ${justify}`);
  });

  it('should align the children correctly', () => {
    const align = 'center';
    const { box } = component({ align });

    expect(box).toHaveStyle(`align-items: ${align}`);
  });

  it.skip('should add correct margins', () => {
    const mt = 10;
    const mr = 20;
    const mb = 15;
    const ml = 5;

    const { box } = component({ mt, mr, mb, ml });

    expect(box).toHaveStyle(`margin-top: ${mt}px`);
    expect(box).toHaveStyle(`margin-right: ${mr}px`);
    expect(box).toHaveStyle(`margin-bottom: ${mb}px`);
    expect(box).toHaveStyle(`margin-left: ${ml}px`);
  });

  it.skip('should add correct paddings', () => {
    const pt = 10;
    const pr = 20;
    const pb = 15;
    const pl = 5;

    const { box } = component({ pt, pr, pb, pl });

    expect(box).toHaveStyle(`padding-top: ${pt}px`);
    expect(box).toHaveStyle(`padding-right: ${pr}px`);
    expect(box).toHaveStyle(`padding-bottom: ${pb}px`);
    expect(box).toHaveStyle(`padding-left: ${pl}px`);
  });

  it.skip('should add correct gap', () => {
    const gap = 10;
    const { box } = component({ gap });

    const styles = window.getComputedStyle(box);
    expect(styles).toContain(`gap: ${gap}px`);
  });

  it('should add custom styles', () => {
    const style = { backgroundColor: 'red' };
    const { box } = component({ style });

    expect(box).toHaveStyle(`background-color: ${style.backgroundColor}`);
  });

  it('should set correct direction', () => {
    const direction = 'column';
    const { box } = component({ direction });

    expect(box).toHaveStyle(`flex-direction: ${direction}`);
  });

  it('should add custom class', () => {
    const className = 'custom-class';
    const { box } = component({ className });

    expect(box).toHaveClass(className);
  });

  it('should set display to inline-flex when inline props is true', () => {
    const { box } = component({ inline: true });

    expect(box).toHaveStyle('display: inline-flex');
  });
});
