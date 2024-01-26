/* eslint-disable sonarjs/no-duplicate-string */
export const inputShadows = {
  active: '0px 0px 0px 1px #397DFF, inset 0px 0px 0px 1px #397DFF',
};

export const surfaceShadows = {
  z1Light:
    '0px 1px 3px 1px rgba(22, 26, 30, 0.01), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 0px 0px rgba(22, 26, 30, 0.02)',
  z16Light:
    '0px 20px 44px -18px rgba(22, 26, 30, 0.12), 0px 16px 28px -18px rgba(22, 26, 30, 0.12), 0px 12px 20px -18px rgba(22, 26, 30, 0.08), 0px 10px 16px -18px rgba(22, 26, 30, 0.08), 0px 8px 12px -18px rgba(22, 26, 30, 0.04), 0px 4px 8px -18px rgba(22, 26, 30, 0.04), 0px 1px 1px 0px rgba(22, 26, 30, 0.01), 0px 0px 0px 1px rgba(22, 26, 30, 0.06)',
  z32Light:
    '0px 40px 64px -32px rgba(22, 26, 30, 0.12), 0px 32px 40px -32px rgba(22, 26, 30, 0.10), 0px 24px 32px -32px rgba(22, 26, 30, 0.08), 0px 16px 20px -32px rgba(22, 26, 30, 0.08), 0px 10px 16px -32px rgba(22, 26, 30, 0.06), 0px 4px 8px -32px rgba(22, 26, 30, 0.04), 0px 1px 1px 0px rgba(22, 26, 30, 0.04), 0px 0px 0px 1px rgba(22, 26, 30, 0.06)',
  z64Light:
    '0px 1px 2px 0px rgba(22, 26, 30, 0.03), 0px 12px 20px -40px rgba(22, 26, 30, 0.04), 0px 16px 28px -40px rgba(22, 26, 30, 0.06), 0px 20px 32px -40px rgba(22, 26, 30, 0.06), 0px 24px 40px -40px rgba(22, 26, 30, 0.08), 0px 36px 56px -40px rgba(22, 26, 30, 0.12), 0px 48px 88px -40px rgba(22, 26, 30, 0.16), 0px 0px 0px 1px rgba(22, 26, 30, 0.06)',
};

export const modalOverlay = 'linear-gradient(0deg, rgba(25, 29, 34, 0.52), rgba(25, 29, 34, 0.52)), #191D22';

export const shadesGlows = {
  '0100Outer': {
    4: '0px 1px 0px rgba(22, 26, 30, 0.04)',
    6: '0px 1px 0px rgba(22, 26, 30, 0.06)',
    8: '0px 1px 0px rgba(22, 26, 30, 0.08)',
    10: '0px 1px 0px rgba(22, 26, 30, 0.1)',
    12: '0px 1px 0px rgba(22, 26, 30, 0.12)',
    16: '0px 1px 0px rgba(22, 26, 30, 0.16)',
    20: '0px 1px 0px rgba(22, 26, 30, 0.2)',
    24: '0px 1px 0px rgba(22, 26, 30, 0.24)',
  },
  '0-100Inner': {
    4: 'inset 0px -1px 0px rgba(0, 0, 0, 0.04)',
    6: 'inset 0px -1px 0px rgba(0, 0, 0, 0.06)',
    8: 'inset 0px -1px 0px rgba(0, 0, 0, 0.08)',
    10: 'inset 0px -1px 0px rgba(0, 0, 0, 0.1)',
    12: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)',
    16: 'inset 0px -1px 0px rgba(0, 0, 0, 0.16)',
    20: 'inset 0px -1px 0px rgba(0, 0, 0, 0.20)',
    24: 'inset 0px -1px 0px rgba(0, 0, 0, 0.24)',
  },
  '0-200Inner': {
    24: 'inset 0px -2px 0px rgba(0, 0, 0, 0.16)z',
  },
  '0001Inner': {
    2: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.02)',
    4: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.04)',
    6: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.06)',
    8: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    10: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)',
    12: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.12)',
    16: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.16)',
    20: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
    24: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.24)',
  },
  innerShades: {
    4: 'inset 0px 0px 1px rgba(255, 255, 255, 0.04)',
    6: 'inset 0px 0px 1px rgba(255, 255, 255, 0.06)',
    8: 'inset 0px 0px 1px rgba(255, 255, 255, 0.08)',
  },
};

export const buttonShadows = {
  primary: {
    default:
      '0px 6px 16px -8px rgba(15, 30, 97, 0.08), 0px 4px 12px -6px rgba(15, 30, 97, 0.06), 0px 3px 8px -4px rgba(15, 30, 97, 0.06), 0px 2px 6px -3px rgba(15, 30, 97, 0.04), 0px 1px 4px -2px rgba(15, 30, 97, 0.04), 0px 1px 3px -1px rgba(15, 30, 97, 0.02), 0px 1px 2px rgba(15, 30, 97, 0.01), inset 0px -1px 0px 1px rgba(47, 104, 219, 0.32), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.32)',
    hover:
      '0px 6px 32px -12px rgba(15, 30, 97, 0.16), 0px 4px 24px -12px rgba(15, 30, 97, 0.12), 0px 4px 12px -4px rgba(15, 30, 97, 0.08), 0px 3px 8px -3px rgba(15, 30, 97, 0.06), 0px 2px 4px -2px rgba(15, 30, 97, 0.04), 0px 2px 4px -1px rgba(15, 30, 97, 0.02), 0px 1px 3px rgba(15, 30, 97, 0.01), inset 0px -1px 0px 1px rgba(38, 78, 180, 0.32), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.32)',
    active: 'inset 0px -1px 0px rgba(28, 54, 142, 0.32), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.32)',
    disabled: shadesGlows['0-100Inner'][6],
  },
  secondaryLight: shadesGlows['0001Inner'][2],
  secondaryDark: {
    default: '0px 1px 2px -1px rgba(0, 0, 0, 0.4), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.1)',
    hover: '0px 5px 6px -5px rgba(0, 0, 0, 0.5), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.1)',
    active: 'none',
    disabled: 'none',
  },
  alert: {
    default:
      '0px 6px 16px -8px rgba(15, 30, 97, 0.08), 0px 4px 12px -6px rgba(15, 30, 97, 0.06), 0px 3px 8px -4px rgba(15, 30, 97, 0.06), 0px 2px 6px -3px rgba(15, 30, 97, 0.04), 0px 1px 4px -2px rgba(15, 30, 97, 0.04), 0px 1px 3px -1px rgba(15, 30, 97, 0.02), 0px 1px 2px rgba(15, 30, 97, 0.01), inset 0px -1px 0px 1px rgba(160, 28, 55, 0.32), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.32)',
    hover:
      '0px 6px 32px -12px rgba(15, 30, 97, 0.16), 0px 4px 24px -12px rgba(15, 30, 97, 0.12), 0px 4px 12px -4px rgba(15, 30, 97, 0.08), 0px 3px 8px -3px rgba(15, 30, 97, 0.06), 0px 2px 4px -2px rgba(15, 30, 97, 0.04), 0px 2px 4px -1px rgba(15, 30, 97, 0.02), 0px 1px 3px rgba(15, 30, 97, 0.01), inset 0px -1px 0px 1px rgba(116, 21, 40, 0.32), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.32)',
    active: 'inset 0px -1px 0px rgba(116, 21, 40, 0.32), inset 0px 1px 2px -1px rgba(255, 255, 255, 0.32)',
  },
};

export const radioControlShadow = {
  default: shadesGlows['0100Outer'][6],
  selected: shadesGlows['0100Outer'][10],
  active: shadesGlows['0-100Inner'][12],
};

export const toastShadows = {
  container: surfaceShadows.z1Light,
  content: shadesGlows['0-100Inner'][8],
};

export const contextMenuShadow = {
  default:
    '0px 20px 44px -18px rgba(22, 26, 30, 0.12), 0px 16px 28px -18px rgba(22, 26, 30, 0.12), 0px 12px 20px -18px rgba(22, 26, 30, 0.08), 0px 10px 16px -18px rgba(22, 26, 30, 0.08), 0px 8px 12px -18px rgba(22, 26, 30, 0.04), 0px 4px 8px -18px rgba(22, 26, 30, 0.04), 0px 1px 1px 0px rgba(22, 26, 30, 0.01), 0px 0px 0px 1px rgba(22, 26, 30, 0.06)',
};

export const colorPreviewShadow = {
  small: '0px -1px 0px 0px rgba(0, 0, 0, 0.16) inset',
  large: '0px -2px 0px 0px rgba(0, 0, 0, 0.16) inset',
};

export const hueSelectorHandle = {
  default: 'inset 0px 1px 0px rgba(22, 26, 30, 0.06)',
  outer: '0px 1px 0px rgba(22, 26, 30, 0.06)',
};

export const chipShadow = {
  default: '0px -1px 0px 0px rgba(0, 0, 0, 0.10) inset',
};
