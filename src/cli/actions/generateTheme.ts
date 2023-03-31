import fs from 'fs';
import util from 'util';
import path from 'path';
import kebabCase from 'lodash/kebabCase.js';

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

/**
  Generates a theme structure in the specified output directory.
  @async
  @function generateTheme
  @param {string} name - The name of the theme to generate. Name is converted to theme ID in kebab case.
  @param {string} description - The description of the theme.
  @param {string} [output='./src/themes'] - The output directory where the theme will be generated.
  @returns {Promise<void>} - A promise that resolves when the theme generation is complete.
*/
export const generateTheme = async (
  name: string,
  description,
  output = './src/themes'
) => {
  const themeId = kebabCase(name);
  const themeDir = path.resolve(output, themeId);
  const componentsDir = path.resolve(themeDir, 'components');

  if (fs.existsSync(themeDir)) {
    console.error(`⚠️ Theme ${name} already exist ${themeDir}`);
    process.exit(1);
  }

  await mkdir(componentsDir, { recursive: true });
  await mkdir(themeDir, { recursive: true });

  await writeFile(
    path.resolve(themeDir, 'theme.ts'),
    [
      `import type { ThemeConfig } from 'adminjs'`,
      ``,
      `export const theme: Partial<ThemeConfig['data']> = {};`,
    ].join('\n')
  );

  await writeFile(path.resolve(themeDir, 'style.css'), '');

  await writeFile(
    path.resolve(themeDir, 'index.ts'),
    [
      `import type { ThemeConfig } from 'adminjs';`,
      `import { theme } from './theme.js';`,
      ``,
      `export const themeConfig: ThemeConfig = {`,
      `  id: '${themeId}',`,
      `  name: '${description || name}',`,
      `  data: theme,`,
      `};`,
    ].join('\n')
  );

  console.log(`✔️ Generated files for ${themeId} theme in ${themeDir}`);
};