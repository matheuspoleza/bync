import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { EmptyPage } from '@/components/Other/EmptyPage';
import type { IEmptyPage } from '@/components/Other/EmptyPage/types';

const titleFixture = 'No entities exist';
const descriptionFixture = 'Entities help your assistant know which data to pluck out from the users response. ';
const illustrationFixture = 'NoContent';
const linkFixture = 'www.google.com';

describe.concurrent('EmptyPage', () => {
  const component = (props?: Partial<IEmptyPage>) => {
    const testID = 'empty-page';

    const { queryByTestId } = render(
      <EmptyPage
        description={descriptionFixture}
        learnMoreLink={linkFixture}
        title={titleFixture}
        testID={testID}
        {...props}
      />
    );

    return {
      illustration: queryByTestId('empty-page--illustration'),
      button: queryByTestId('empty-page--button'),
    };
  };

  it('should render an illustration when the name is provided', ({ expect }) => {
    const { illustration } = component({ illustration: illustrationFixture });

    expect(illustration).toBeInTheDocument();
  });

  it('should render a button when the button props are provided', ({ expect }) => {
    const { button } = component({
      button: {
        label: 'Create entity',
        testID: 'empty-page--button',
        onClick: () => null,
      },
    });

    expect(button).toBeInTheDocument();
  });

  it('triggers onClick when clicked', ({ expect }) => {
    const onClick = vi.fn();
    const { button } = component({
      button: {
        label: 'Create entity',
        testID: 'empty-page--button',
        onClick,
      },
    });

    userEvent.click(button!);

    expect(onClick).toHaveBeenCalled();
  });

  it('should omit illustration and button if props are not provided', ({ expect }) => {
    const { button, illustration } = component();

    expect(illustration).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
