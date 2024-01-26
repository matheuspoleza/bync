/* eslint-disable no-secrets/no-secrets */
import fs from 'fs';
import path from 'path';
import { describe } from 'vitest';

import { extractExportedInterfaces } from '.';

describe('Generate Interface Docs', () => {
  it('ExtractExportedInterfaces handles JSDoc comments correctly', () => {
    const filePath = path.join(__dirname, '__fixtures__', 'with-jsdoc-comments.ts');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const got = extractExportedInterfaces(fileContent);
    const want = `export interface ISearchInput
        extends Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'type'>,
          FormControlProps<string> {
        type?: Exclude<React.HTMLInputTypeAttribute, 'button' | 'checkbox' | 'number' | 'radio' | 'range' | 'submit'>;
        testID?: string;
        fullWidth?: boolean;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onClear?: () => void;
        containerRef?: React.Ref<HTMLDivElement>;
        containerClassName?: string;
      }
    `;
    expect(got[0].interfaceContent.replace(/\s/g, '')).toBe(want.replace(/\s/g, ''));
  });
});

describe('Extract Exported Interfaces', () => {
  it('handles single line interfaces', () => {
    const filePath = path.join(__dirname, '__fixtures__', 'single-line-definition.ts');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const got = extractExportedInterfaces(fileContent);
    const want = [{ name: 'ITextField', interfaceContent: 'export interface ITextField extends IInput {}' }];
    expect(got).toEqual(want);
  });

  it('handles the image library definition', () => {
    const filePath = path.join(__dirname, '__fixtures__', 'multiple-definitions.ts');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const got = extractExportedInterfaces(fileContent);
    const want = [
      {
        name: 'IBaseImage',
        interfaceContent: `export interface IBaseImage {
  id: string;
  url: string;
  name: string;
}`,
      },
      {
        name: 'IImageLibrary',
        interfaceContent: `export interface IImageLibrary<Image extends IBaseImage> {
  images: Image[];
  testID?: string;
  onImageSelect?: (image: Image) => void;
  onImageRemove?: (image: Image) => void;
}`,
      },
      {
        name: 'ITest',
        interfaceContent: `export interface ITest {
  howdy: 'folks';
}`,
      },
    ];
    expect(got).toEqual(want);
  });
});
