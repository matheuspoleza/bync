import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Avatar } from '@/components/Media/Avatar';

const FIXTURE_LABEL = 'C';
const SRC = 'https://picsum.photos/200';

describe.concurrent('Avatar', () => {
  it('should render a picture when src is provided', ({ expect }) => {
    const avatar = <Avatar src={SRC} alt="Avatar 1" />;
    const { getByRole } = render(avatar);
    const img = getByRole('img');

    expect(img).toBeInTheDocument();
  });

  it('should render a fallback label when src is not provided', ({ expect }) => {
    const avatar = (
      <Avatar src={undefined} alt="Avatar 1">
        {FIXTURE_LABEL}
      </Avatar>
    );
    const { getByText } = render(avatar);
    const textElement = getByText(FIXTURE_LABEL);

    expect(textElement).toBeInTheDocument();
  });
});
