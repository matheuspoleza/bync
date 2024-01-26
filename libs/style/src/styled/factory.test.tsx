import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import {
  Button,
  InlineThemedButton,
  InlineVarButton,
  RecipeButton,
  ReuseCSS,
  ReuseStyled,
  Theme,
  ThemedButton,
  VariantButton,
} from '@/__fixtures__';
import { ThemeProvider } from '@/ThemeContext';

const BASE_STYLE = {
  padding: '20px',
  borderRadius: '10px',
  margin: '10px',
};

describe('styled factory', () => {
  describe('static styling', () => {
    it('should inherit styles from static CSS', () => {
      render(<Button />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base);
      expect(el).toHaveStyle(BASE_STYLE);
    });
  });

  describe('reusable CSS', () => {
    it('should extend static CSS with overrides', () => {
      render(<ReuseCSS />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, ReuseCSS.css.base);
      expect(el).toHaveStyle({
        padding: '20px',
        margin: '10px',
        backgroundColor: 'red',
        borderRadius: '0',
      });
    });
  });

  describe('reusable styled components', () => {
    it('should extend styled component with overrides', () => {
      render(<ReuseStyled />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, ReuseStyled.css.override);
      expect(el).toHaveStyle({
        padding: '20px',
        border: '1px solid red',
        margin: '2px',
      });
    });
  });

  describe('style variants', () => {
    it('should render the primary style variant', () => {
      render(<VariantButton variant="primary" />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, VariantButton.css.variants.primary);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        borderWidth: '2px',
        borderColor: 'pink',
      });
    });

    it('should render the secondary style variant', () => {
      render(<VariantButton variant="secondary" />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, VariantButton.css.variants.secondary);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        borderWidth: '2px',
        borderColor: 'blue',
      });
    });
  });

  describe('style recipes', () => {
    it('should render a recipe with default variants', () => {
      render(<RecipeButton />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        border: '1px dashed black',
        fontSize: '18px',
      });
    });

    it('should render a recipe with selected variants', () => {
      render(<RecipeButton fontSize="sm" color="warn" />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        border: '1px dashed black',
        backgroundColor: 'orange',
        fontSize: '10px',
      });
    });
  });

  // unable to test CSS variables fully in JSDOM it seems
  // https://github.com/jsdom/jsdom/pull/3299
  describe.skip('themed components', () => {
    it('should render styles from the provided theme', () => {
      render(
        <ThemeProvider theme={Theme.light}>
          <ThemedButton />
        </ThemeProvider>
      );

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, ThemedButton.css.themed);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        color: 'red',
        borderRadius: '0',
      });
    });

    it('should override styles with contextual themes', () => {
      render(
        <ThemeProvider theme={Theme.light}>
          <ThemeProvider theme={Theme.dark}>
            <ThemedButton />
          </ThemeProvider>
        </ThemeProvider>
      );

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, ThemedButton.css.themed);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        color: 'blue',
        borderRadius: '0',
      });
    });
  });

  describe.skip('inline CSS variables', () => {
    it('should render style from dynamic values', () => {
      render(<InlineVarButton brandColor="green" />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, InlineVarButton.css.base);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        color: 'green',
        borderRadius: '0',
      });
    });
  });

  describe.skip('inline theme', () => {
    it('should render style from inline theme', () => {
      render(<InlineThemedButton brandColor="green" />);

      const el = screen.getByRole('button');
      expect(el).toHaveClass(Button.css.base, InlineThemedButton.css.themed);
      expect(el).toHaveStyle({
        ...BASE_STYLE,
        color: 'green',
        borderRadius: '0',
      });
    });
  });
});
