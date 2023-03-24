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
  bundlePath: `${root}/${theme}/theme.bundle.js`,
  stylePath: `${root}/${theme}/style.css`,
});
