import fs from 'fs';
import util from 'util';
import path from 'path';
import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import virtual from '@rollup/plugin-virtual';
import { external } from 'adminjs/src/backend/bundler/config';

const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
const rm = util.promisify(fs.rm);

export async function bundle(input = './src/themes', output = './lib') {
  await rm(output, { recursive: true, force: true });
  const themes = await readdir(input);

  await Promise.all(
    themes.map(async theme => {
      const themeDir = path.resolve(input, theme);
      const componentsDir = path.resolve(themeDir, 'components');
      const components = await readdir(componentsDir);
      const files = components.map(file => {
        const filePath = path.resolve(componentsDir, file);
        return {
          component: path.parse(filePath).name,
          path: filePath,
        };
      });

      const bundleInput = [
        ...files.map(
          ({ component, path }) =>
            `export { default as ${component} } from '${path}';`
        ),
      ].join('\n');

      const {
        output: [{ code: bundle }],
      } = await compile(bundleInput).then(bundle =>
        bundle.generate({
          globals: { react: 'React' },
          format: 'iife',
          name: `THEMES.${theme}`,
        })
      );

      const outputThemeDir = path.resolve(output, theme);

      await mkdir(outputThemeDir, { recursive: true });
      await writeFile(path.resolve(outputThemeDir, 'theme.bundle.js'), bundle);
      await copyFile(
        path.resolve(themeDir, 'style.css'),
        path.resolve(outputThemeDir, `style.css`)
      );
    })
  );

  const files = themes.map(theme => {
    const dir = path.resolve(input, theme);
    return {
      theme,
      index: path.resolve(dir, 'index.ts'),
    };
  });

  const indexInput = [
    'import { createTheme } from "./src/createTheme.ts";',
    ...files.map(({ theme, index }) => `import ${theme}Raw from '${index}';`),
    ...files.map(
      ({ theme }) =>
        `export const ${theme} = createTheme(${theme}Raw, '${theme}', __dirname);`
    ),
  ].join('\n');

  const {
    output: [{ code: index }],
  } = await compile(indexInput).then(bundle =>
    bundle.generate({ format: 'commonjs' })
  );

  await mkdir(output, { recursive: true });
  await writeFile(path.resolve(output, 'index.js'), index);

  const types = [
    'import { ThemeConfig } from "adminjs";',
    ...files.map(({ theme }) => `declare const ${theme}: ThemeConfig;`),
    ...files.map(({ theme }) => `export { ${theme} };`),
  ].join('\n');
  await writeFile(path.resolve(output, 'index.d.ts'), types);
}

const compile = async (code: string) =>
  rollup({
    input: 'entry',
    plugins: [
      virtual({
        entry: code,
      }),
      typescript({
        module: 'esnext',
        jsx: 'react',
        compilerOptions: {
          declarationDir: null,
          resolveJsonModule: true,
        },
      }),
    ],
    external,
  });
