import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Editor } from '../Editor.component';
import type { IEditor } from '../Editor.interface';

const testTitle = 'Label';

describe('Editor', () => {
  const component = (props?: Partial<IEditor>) => {
    const testID = 'test-id';
    const onChange = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <Editor {...props} title={testTitle} testID={testID} onTitleChange={onChange} />
    );

    return {
      sideEditorContainer: getByTestId(testID),
      title: getByTestId(`${testID}--title`),
      headerActions: queryByTestId(`${testID}--header-actions`),
      titleInput: queryByTestId(`${testID}--input`),
      footer: queryByTestId(`${testID}--footer`),
    };
  };

  it('renders', () => {
    const { sideEditorContainer } = component();

    expect(sideEditorContainer).toBeInTheDocument();
  });

  it('should render a footer when the footer is provided', ({ expect }) => {
    const { footer } = component({
      footer: <div />,
    });

    expect(footer).toBeInTheDocument();
  });

  it('should render header actions when the header actions are provided', ({ expect }) => {
    const { headerActions } = component({
      headerActions: <div />,
    });

    expect(headerActions).toBeInTheDocument();
  });
});
