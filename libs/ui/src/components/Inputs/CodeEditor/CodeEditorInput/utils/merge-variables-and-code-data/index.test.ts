import { describe } from 'vitest';

import type { TVariableEntityMap } from '../../types';
import { mergeVariablesAndCodeData } from '.';

describe('Merge Variables And Code Data', () => {
  it('correctly assigns the values', () => {
    const fixture = [
      'if(',
      {
        variableID: '123',
      },
      ' > 10) {\nconsole.log()\n}',
    ];
    const variables: TVariableEntityMap = {
      123: {
        id: '123',
        name: 'otherCoolName',
        kind: 'variable',
        color: 'blue',
        variant: 'variable',
      },
    };
    const want = [
      'if(',
      {
        id: '123',
        name: 'otherCoolName',
        kind: 'variable',
        color: 'blue',
        variant: 'variable',
      },
      ' > 10) {\nconsole.log()\n}',
    ];

    const got = mergeVariablesAndCodeData(fixture, variables);
    expect(want).toEqual(got);
  });
});
