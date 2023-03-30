import fs from 'fs';
import util from 'util';
import path from 'path';
import kebabCase from 'lodash/kebabCase.js';

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

export const generateTheme = async (
  name: string,
  description,
  output = './src/themes'
) => {
  const themeId = kebabCase(name);
  const themeDir = path.resolve(output, themeId);
  const componentsDir = path.resolve(themeDir, 'components');

  await mkdir(themeDir, { recursive: true });

  await writeFile(
    path.resolve(themeDir, 'index.ts'),
    [
      `import { ThemeConfig } from '../../types/index.js';`,
      `import { theme } from './theme.js';`,
      ``,
      `export const themeConfig: ThemeConfig = {`,
      `  id: '${themeId}',`,
      `  name: '${description || name}',`,
      `  data: theme,`,
      `};`,
    ].join('\n')
  );

  await writeFile(
    path.resolve(themeDir, 'theme.ts'),
    [
      `import { ThemeConfig } from '../../types/index.js'`,
      ``,
      `export const theme: Partial<ThemeConfig['data']> = {};`,
    ].join('\n')
  );

  await writeFile(path.resolve(themeDir, 'style.css'), '');

  await mkdir(componentsDir, { recursive: true });
};
