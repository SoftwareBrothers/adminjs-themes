import fs from 'fs';
import util from 'util';
import path from 'path';
import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import virtual from '@rollup/plugin-virtual';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import { external, globals } from 'adminjs/bundler';

const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const rm = util.promisify(fs.rm);

export async function bundle(
  input = './src/themes',
  output = './src',
  root = undefined
) {
  await rm(output, { recursive: true, force: true });
  const themes = await readdir(input);

  await Promise.all(
    themes.map(async theme => {
      if (theme === 'index.ts') return;
      const themeDir = path.resolve(input, theme);
      const outputThemeDir = themeDir;
      // await mkdir(outputThemeDir, { recursive: true });
      const componentsDir = path.resolve(themeDir, 'components');
      const components = await readdir(componentsDir).catch(() => []);
      const files = components
        .filter(file => ['.tsx', '.jsx'].includes(path.parse(file).ext))
        .map(file => {
          const filePath = path.resolve(componentsDir, file);
          return {
            component: path.parse(filePath).name,
            path: filePath,
          };
        });

      const bundleInput = [
        ...files.map(
          ({ component, path }) =>
            `export { default as ${component} } from '${path}'`
        ),
      ].join('\n');

      const {
        output: [{ code: bundle }],
      } = await compile(bundleInput).then(bundle =>
        bundle.generate({
          globals,
          format: 'iife',
          name: `THEME_COMPONENTS`,
        })
      );

      await writeFile(path.resolve(outputThemeDir, 'theme.bundle.js'), bundle);
      // await copyFile(
      //   path.resolve(themeDir, 'style.css'),
      //   path.resolve(outputThemeDir, `style.css`)
      // );
    })
  );

  // const files = themes.map(theme => {
  //   const dir = path.resolve(input, theme);
  //   return {
  //     theme,
  //     overrides: path.resolve(dir, 'theme.ts'),
  //     // details: path.resolve(dir, 'details.json'),
  //   };
  // });

  // const indexInput = [
  //   `import { createTheme } from './src/createTheme.ts'`,
  //   ...files.map(({ theme, overrides, details }) =>
  //     [
  //       `import ${theme}Overrides from '${overrides}'`,
  //       `import ${theme}Details from '${details}'`,
  //       `export const ${theme} = createTheme(${theme}Overrides, '${theme}', ${theme}Details.name, ${root})`,
  //     ].join('\n')
  //   ),
  // ].join('\n');

  // const {
  //   output: [{ code: index }],
  // } = await compile(indexInput).then(bundle =>
  //   bundle.generate({ format: 'esm' })
  // );

  // await mkdir(output, { recursive: true });
  // await writeFile(path.resolve(output, 'index.js'), index);

  // const types = [
  //   `import type { ThemeConfig } from 'adminjs'`,
  //   ...files.map(({ theme }) =>
  //     [`declare const ${theme}: ThemeConfig`, `export { ${theme} }`].join('\n')
  //   ),
  // ].join('\n');
  // await writeFile(path.resolve(output, 'index.d.ts'), types);
}

const compile = async code =>
  rollup({
    input: 'entry',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      json(),
      nodeResolve(),
      commonjs(),
      virtual({
        entry: code,
      }),
      typescript({
        moduleResolution: 'nodenext',
        module: 'nodenext',
        target: 'esnext',
        jsx: 'react',
        compilerOptions: {
          declarationDir: null,
          resolveJsonModule: true,
        },
      }),
      terser(),
    ],
    external,
  });
