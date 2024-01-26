import { describe } from 'vitest';

import { formatMarkupToCodeData } from '.';

describe('Format Markup To Code Data', () => {
  it('works with single variable on line', () => {
    const fixture =
      'if(<%{"id":"123","name":"otherCoolName","kind":"variable","color":"blue","variant":"variable"}%> > 10) {\nconsole.log()\n}';
    const want = [
      'if(',
      {
        variableID: '123',
      },
      ' > 10) {\nconsole.log()\n}',
    ];

    const got = formatMarkupToCodeData(fixture);

    expect(got).toEqual(want);
  });
});
