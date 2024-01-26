import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { AvatarList } from '@/components/Media/AvatarList';
import type { IAvatarList, IUser } from '@/components/Media/AvatarList/types';

const listFixtureNoImage: IUser[] = [
  {
    variant: 'darkHavelock',
    name: 'Antonio Banderas',
  },
  {
    variant: 'darkHibiscus',
    name: 'Brad Pitt',
  },
  {
    variant: 'darkFern',
    name: ' Catherine Zeta-Jones',
  },
];

const listFixture: IUser[] = [
  {
    src: 'https://picsum.photos/seed/1/200',
    alt: 'Banderas Avatar',
    variant: 'darkHavelock',
    name: 'Antonio Banderas',
  },
  {
    src: 'https://picsum.photos/seed/2/200',
    alt: 'Brad Avatar',
    variant: 'darkHibiscus',
    name: 'Brad Pitt',
  },
];

describe.concurrent('AvatarList', () => {
  const component = ({ list = [], ...props }: Partial<IAvatarList>) => {
    const testID = 'avatar-list';
    const { queryByTestId, queryByText, queryByAltText } = render(
      <AvatarList testID={testID} {...props} list={list} />
    );

    return {
      list: queryByTestId('avatar-list'),
      firstNoImageUser: queryByText('A'),
      secondNoImageUser: queryByText('B'),
      thirdNoImageUser: queryByText('C'),
      firstImage: queryByAltText('Banderas Avatar'),
      secondImage: queryByAltText('Brad Avatar'),
      button: queryByTestId('avatar-list--add-button'),
    };
  };

  it('should render an avatar list when the list is provided', ({ expect }) => {
    const { firstNoImageUser, secondNoImageUser, thirdNoImageUser } = component({ list: listFixtureNoImage });

    expect(firstNoImageUser).toBeInTheDocument();
    expect(secondNoImageUser).toBeInTheDocument();
    expect(thirdNoImageUser).toBeInTheDocument();
  });

  it('should render the profile image if provided', ({ expect }) => {
    const { firstImage, secondImage, firstNoImageUser, secondNoImageUser } = component({ list: listFixture });

    expect(firstNoImageUser).not.toBeInTheDocument();
    expect(secondNoImageUser).not.toBeInTheDocument();
    expect(firstImage).toBeInTheDocument();
    expect(secondImage).toBeInTheDocument();
  });

  it('should render a working button if callback handler is provided', ({ expect }) => {
    const onClick = vi.fn();
    const { button } = component({ list: listFixtureNoImage, onButtonClick: onClick });

    userEvent.click(button!);

    expect(button).toBeInTheDocument();
    expect(onClick).toHaveBeenCalled();
  });

  it('getFirstChar should return the first non-space character of a string', ({ expect }) => {
    expect(AvatarList.getFirstChar('  antonio')).toEqual('A');
    expect(AvatarList.getFirstChar('Brad')).toEqual('B');
    expect(AvatarList.getFirstChar('123e')).toEqual('1');
    expect(AvatarList.getFirstChar('!@#%')).toEqual('!');
  });
});
