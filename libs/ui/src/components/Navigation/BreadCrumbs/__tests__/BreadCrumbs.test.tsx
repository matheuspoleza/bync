import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it, vi } from 'vitest';

import { BreadCrumbs } from '../BreadCrumbs.component';
import type { IBreadCrumbs } from '../types';

const testID = 'test-id';

describe('BreadCrumbs', () => {
  const component = (props?: Partial<IBreadCrumbs>) => {
    const mock = vi.fn();

    const fixture = [{ label: 'Org' }, { label: 'Dep' }, { label: 'Team' }];
    const testID = 'test-id';

    const { getByTestId, getByText, queryByTestId } = render(
      <BreadCrumbs items={fixture} testID={testID} {...props} />
    );

    const getBreadCrumb = (index: number) => getByTestId(`${testID}--${index}`);

    return {
      breadCrumbs: getByTestId(testID),
      getBreadCrumb,
      getByTestId,
      queryByTestId,
      getByText,
      mock,
    };
  };

  it('renders, displaying the correct labels and no dash for single breadcrumb', () => {
    const { breadCrumbs, getByText } = component({ items: [{ label: 'Org' }] });

    expect(breadCrumbs).toBeInTheDocument();
    expect(getByText('Org')).toBeInTheDocument();
  });

  it('displays the correct labels and dashes for multiple breadcrumb', () => {
    component();
    const got = screen.getByTestId(testID).textContent;

    const want = `Org/Dep/Team`;
    expect(got).toBe(want);
  });

  it('calls the onClick handler when a breadcrumb is clicked', () => {
    const mock = vi.fn();
    const value = 'Howdy';
    const secondMock = vi.fn();
    const fixture = [
      { label: value, onClick: mock },
      { label: value, onClick: secondMock },
    ];

    const { getByTestId } = component({ items: fixture });
    const firstBreadcrumb = getByTestId(`${testID}--0`);
    act(() => {
      userEvent.click(firstBreadcrumb);
    });

    expect(mock).toHaveBeenCalled();
    expect(secondMock).not.toHaveBeenCalled();
  });

  it("doesn't call the onClick handler when the last breadcrumb is clicked", () => {
    const mock = vi.fn();
    const value = 'Howdy';
    const secondValue = 'Folks';
    const secondMock = vi.fn();
    const fixture = [
      { label: value, onClick: mock },
      { label: secondValue, onClick: secondMock },
    ];

    const { getBreadCrumb } = component({ items: fixture });
    const lastBreadCrumb = getBreadCrumb(1);
    act(() => {
      userEvent.click(lastBreadCrumb);
    });

    expect(mock).not.toHaveBeenCalled();
    expect(secondMock).not.toHaveBeenCalled();
  });
});
