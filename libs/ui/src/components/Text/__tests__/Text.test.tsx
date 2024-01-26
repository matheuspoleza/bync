import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { IText } from '@/components/Text';
import { Text } from '@/components/Text';

describe('Text', () => {
  const component = ({ children = 'Hello, world!', ...props }: IText = {}) => {
    const testID = 'test-id';

    const { queryByTestId } = render(
      <Text testID={testID} {...props}>
        {children}
      </Text>
    );

    return {
      text: queryByTestId(testID),
    };
  };

  it('renders with default props with correct P tag', () => {
    const { text } = component();

    expect(text).toBeInTheDocument();
    expect(text?.tagName).toBe('P');
  });

  it('renders with H1 correctly', () => {
    const { text } = component({ variant: 'h1' });

    expect(text).toBeInTheDocument();
    expect(text?.tagName).toBe('H1');
  });

  it('renders with code correctly', () => {
    const { text } = component({ variant: 'code' });

    expect(text).toBeInTheDocument();
    expect(text?.tagName).toBe('CODE');
  });

  it('renders with additional class name', () => {
    const className = 'custom-class';

    const { text } = component({ className });

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(className);
  });

  it('renders null if no children are provided', () => {
    const { text } = component({ children: '' });

    expect(text).not.toBeInTheDocument();
  });
});
