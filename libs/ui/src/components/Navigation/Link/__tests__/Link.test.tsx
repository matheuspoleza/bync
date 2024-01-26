// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, vi } from 'vitest';

import { Link } from '../Link.component';
import type { ILink } from '../types';

describe('Link', () => {
  const component = (props?: Partial<ILink>) => {
    const testID = 'test-id';
    const onClick = vi.fn();

    const { getByTestId } = render(<Link label="Label" onClick={onClick} {...props} testID={testID} />);

    return {
      link: getByTestId(testID),
      onClick,
    };
  };

  it('should render', () => {
    const { link } = component();

    expect(link).toBeInTheDocument();
  });

  it('should call the callback when provided and no href', () => {
    const { link, onClick } = component();

    link.click();

    expect(onClick).toHaveBeenCalled();
    expect(link).not.toHaveAttribute('href');
  });

  it('should redirect when URL is provided', () => {
    const { link } = component({ href: 'https://www.google.com' });

    expect(link).toHaveAttribute('href', 'https://www.google.com');
  });

  it('should not redirect or fire callback when disabled', () => {
    const { link, onClick } = component({ disabled: true, href: 'https://www.google.com' });

    link.click();

    expect(onClick).not.toHaveBeenCalled();
    expect(link).not.toHaveAttribute('href');
  });
});
