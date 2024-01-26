import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, vi } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  // eslint-disable-next-line no-undef
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

this.global.DOMRect = class DOMRect {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(_x = 0, _y = 0, _width = 0, _height = 0) {}

  static fromRect(other) {
    return new DOMRect(other.x, other.y, other.width, other.height);
  }

  toJSON() {
    return JSON.stringify(this);
  }
};
