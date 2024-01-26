import { describe, it } from 'vitest';

import { DEFAULT_THREHSOLDS, getQualityLevel } from '../quality-level.util';

describe('getQualityLevel', () => {
  it('should return "low" when the value is less than or equal to 0', () => {
    expect(getQualityLevel(-10)).toBe('low');
    expect(getQualityLevel(0)).toBe('low');
  });

  it('should return the correct quality level for values within each threshold', () => {
    const thresholds = Object.keys(DEFAULT_THREHSOLDS).map(Number);

    thresholds.forEach((threshold) => {
      expect(getQualityLevel(threshold + 1)).toBe(DEFAULT_THREHSOLDS[threshold]);
    });
  });

  it('should return the correct quality level for values greater than the highest threshold', () => {
    expect(getQualityLevel(101)).toBe('great');
  });
});
