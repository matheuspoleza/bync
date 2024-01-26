import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { SectionHeaderButton, SectionHeaderCaption } from '../components';
import type { ISectionHeader } from '../SectionHeader.component';
import { SectionHeader } from '../SectionHeader.component';

describe.concurrent('SectionHeader', () => {
  const component = ({ title, ...props }: ISectionHeader) => {
    const testID = 'test-id';
    const { getByTestId, queryAllByTestId, queryByTestId } = render(
      <SectionHeader testID={testID} title={title} {...props}>
        {props.children}
      </SectionHeader>
    );

    return {
      header: getByTestId(`${testID}--section-header`),
      title: getByTestId(`${testID}--section-header-title`),
      caption: queryByTestId(`${testID}--section-header-caption`),
      dragButton: () => queryByTestId(testID),
      rightButton: () => queryAllByTestId(`${testID}--section-header-button`)[0],
      leftButton: () => queryAllByTestId(`${testID}--section-header-button`)[1],
    };
  };

  it('renders minimal SectionHeader with just a title', ({ expect }) => {
    const title = 'title';
    const { header } = component({ title });

    expect(header).toHaveTextContent(title);
  });

  it('renders SectionHeader with caption and clickable buttons', ({ expect }) => {
    const title = 'title';
    const testID = 'test-id';
    const rightButtonHandler = vi.fn();
    const leftButtonHandler = vi.fn();

    const captionElement = <SectionHeaderCaption testID={testID}>caption</SectionHeaderCaption>;
    const buttons = (
      <>
        <SectionHeaderButton iconName="Copy" onClick={leftButtonHandler} testID={testID} />
        <SectionHeaderButton iconName="Plus" onClick={rightButtonHandler} testID={testID} />
      </>
    );

    const { rightButton, leftButton, caption } = component({
      title,
      children: (
        <>
          {captionElement}
          {buttons}
        </>
      ),
    });

    expect(caption).toBeInTheDocument();
    expect(rightButton()).toBeInTheDocument();
    expect(leftButton()).toBeInTheDocument();

    userEvent.click(rightButton()!);
    userEvent.click(leftButton()!);
    expect(rightButtonHandler).toHaveBeenCalled();
    expect(leftButtonHandler).toHaveBeenCalled();
  });

  it('renders SectionHeader with disabled header', ({ expect }) => {
    const title = 'title';
    const variant = 'disabled';
    const { header } = component({ title, variant });

    expect(header).toHaveStyle({ cursor: 'not-allowed' });
  });
});
