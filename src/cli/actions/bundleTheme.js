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
import babel from '@rollup/plugin-babel';
import { external, globals } from 'adminjs/bundler';

const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const rm = util.promisify(fs.rm);

export const bundleTheme = async (
  input = './src/themes',
  output = './src',
  themeId = undefined
) => {
  await rm(output, { recursive: true, force: true });

  if (themeId) {
    bundleThemeById(themeId);
  } else {
    const themes = (await readdir(input, { withFileTypes: true }))
      .filter(dirent => !dirent.isFile())
      .map(dirent => dirent.name);
    await Promise.all(themes.map(id => bundleThemeById(input, id)));
  }
};

const bundleThemeById = async (input, id) => {
  const themeDir = path.resolve(input, id);
  const outputThemeDir = themeDir;
  const componentsDir = path.resolve(themeDir, 'components');
  const componentsFiles = await readdir(componentsDir).catch(() => []);
  const components = componentsFiles
    .reduce((acc, file) => {
      const fileExt = path.parse(file).ext;
      if (['.tsx', '.jsx'].includes(fileExt)) {
        const filePath = path.resolve(componentsDir, file);
        const { name: component } = path.parse(filePath);
        const exportLine = `export { default as ${component} } from '${filePath}'`;
        acc.push(exportLine);
      }
      return acc;
    }, [])
    .join('\n');

  const {
    output: [{ code: bundle }],
  } = await compile(components).then(bundle =>
    bundle.generate({ globals, format: 'iife', name: `THEME_COMPONENTS` })
  );

  await writeFile(path.resolve(outputThemeDir, 'theme.bundle.js'), bundle);
};

const compile = async code =>
  rollup({
    input: 'entry',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      json(),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        babelHelpers: 'bundled',
      }),
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
