import { ThemeConfig } from './types/index.js';

export const createTheme = (
  data: ThemeConfig['data'],
  theme: string,
  name: string,
  root: string
): ThemeConfig => ({
  id: theme,
  name,
  data,
  bundlePath: root ? `${root}/${theme}/theme.bundle.js` : undefined,
  stylePath: root ? `${root}/${theme}/style.css` : undefined,
});
