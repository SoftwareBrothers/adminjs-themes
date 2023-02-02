import { ThemeConfig, ThemeOptions } from 'adminjs';

export const createTheme = (
  data: ThemeOptions,
  theme: string,
  root: string
): ThemeConfig => {
  return {
    id: theme,
    data,
    bundlePath: `${root}/${theme}/theme.bundle.js`,
    stylePath: `${root}/${theme}/style.css`,
  };
};
