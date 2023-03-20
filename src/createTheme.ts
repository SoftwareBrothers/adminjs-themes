import type { ThemeConfig } from 'adminjs';

export const createTheme = (
  data: ThemeConfig['data'],
  theme: string,
  name: string,
  root: string
): ThemeConfig => {
  return {
    id: theme,
    name,
    data,
    bundlePath: `${root}/${theme}/theme.bundle.js`,
    stylePath: `${root}/${theme}/style.css`,
  };
};
