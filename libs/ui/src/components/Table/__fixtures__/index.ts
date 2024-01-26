import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { type Atom, atom } from 'jotai';

import type { TableItem } from '../Table.interface';

export interface TableItemExample extends TableItem {
  name: string;
  link: string;
  error: boolean;
  group: false;
  updatedAt: string;
  lastEditor: string;
}

export interface TableGroupItemExample extends TableItem {
  name: string;
  group: true;
  count: number;
}

export const DATA_SIZE = 800;

export const makeData = () => {
  faker.seed(1);

  const items: Array<Atom<TableItemExample | TableGroupItemExample>> = [
    atom({
      id: faker.string.uuid(),
      name: 'Landing page URL’s',
      group: true,
      count: 1,
    }),
    atom({
      id: faker.string.uuid(),
      name: 'Product information',
      group: true,
      count: 17,
    }),
    atom({
      id: faker.string.uuid(),
      name: 'Zendesk help documentation',
      group: true,
      count: 33,
    }),
    atom({
      id: faker.string.uuid(),
      name: 'a a account balance inquiry',
      link: 'https://changelog.voiceflow.com/en/updates-to-knowledge-base',
      group: false,
      error: false,
      updatedAt: dayjs().subtract(1, 'minute').toJSON(),
      lastEditor: 'Luna Lovegood',
    }),
    atom({
      id: faker.string.uuid(),
      name: 'a a Branch/ATM locator',
      link: 'https://changelog.voiceflow.com/en/conversation-memory-dfcx-assistant-importer-and-more',
      group: false,
      error: true,
      updatedAt: dayjs().subtract(1, 'day').toJSON(),
      lastEditor: 'Katie Bell',
    }),
  ];

  for (let i = 0; i < DATA_SIZE; i++) {
    items.push(
      atom({
        id: faker.string.uuid(),
        name: faker.lorem.words({ min: 2, max: 5 }),
        link: `${faker.internet.url()}${faker.lorem.slug()}`,
        error: faker.number.int({ min: 0, max: 5 }) === 3,
        group: false,
        updatedAt: faker.date.recent({ days: 60 }).toJSON(),
        lastEditor: faker.person.fullName(),
        description: faker.lorem.paragraph(),
      })
    );
  }

  return items;
};
