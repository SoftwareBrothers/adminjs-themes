import type { ThemeConfig } from 'adminjs';

export const overrides: ThemeConfig['overrides'] = {
  colors: {
    primary100: '#256BEE',
    bg: '#151419',
    border: '#39383d',
    text: '#fff',
    container: '#1A1A1E',
    sidebar: '#0C0B10',
    grey100: '#CDCBD4',
    grey60: '#8C8B90',
    grey40: '#151419',
    filterBg: '#1A1A1E',
    inputBorder: 'rgba(145, 158, 171, 0.32)',
    errorLight: '#C20012',
    successLight: '#007D7F',
    warningLight: '#A14F17',
    infoLight: '#3040D6',
  },
  borders: {
    default: '1px solid #232228',
    input: '1px solid #232228',
  },
  shadows: {
    login: '0 15px 24px 0 rgba(0, 0, 0, 0.3)',
    cardHover: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
    drawer: '-2px 0 8px 0 rgba(0, 0, 0, 0.3)',
    card: '0 1px 6px 0 rgba(0, 0, 0, 0.3)',
  },
};
