import type { ThemeConfig } from 'adminjs';

export const theme: Partial<ThemeConfig['data']> = {
  colors: {
    primary100: '#256BEE',
    bg: '#151419',
    border: '#39383d',
    text: '#fff',
    container: '#1A1A1E',
    sidebar: '#0C0B10',
    grey100: '#8C8B90',
    grey60: '#8C8B90',
    filterBg: '#1A1A1E',
    inputBorder: 'rgba(145, 158, 171, 0.32)',
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
