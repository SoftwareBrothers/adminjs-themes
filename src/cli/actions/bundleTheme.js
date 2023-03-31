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

/**
  Bundle the components of a theme or all themes in a directory and write the output to a file.
  @async
  @param {string} [input='./src/themes'] - The directory containing the themes.
  @param {string} [themeId] - The ID of the theme to bundle. If not provided, all themes in the input directory will be bundled.
  @returns {Promise<void>} - A Promise that resolves when all themes have been bundled and written to files.
*/
export const bundleTheme = async (
  input = './src/themes',
  themeId = undefined
) => {
  if (themeId) {
    await bundleComponents(input, themeId);
  } else {
    const themes = (await readdir(input, { withFileTypes: true }))
      .filter(dirent => !dirent.isFile())
      .map(dirent => bundleComponents(input, dirent.name));
    await Promise.all(themes);
  }
  console.log(`Bundling completed`);
};

/**
  Bundle components of a theme into a single JS file and write it to the theme's directory.
  @async
  @param {string} input - The base directory for the theme.
  @param {string} id - The ID of the theme.
  @returns {Promise<void>} - A Promise that resolves when the components are bundled and written to a file.
*/
const bundleComponents = async (input, id) => {
  const themeDir = path.resolve(input, id);
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

  console.log(`⚙️ Bundling components for ${id} theme ...`);
  const {
    output: [{ code: bundle }],
  } = await compile(components).then(bundle =>
    bundle.generate({ globals, format: 'iife', name: `THEME_COMPONENTS` })
  );

  await writeFile(path.resolve(themeDir, 'theme.bundle.js'), bundle);
  console.log(`✔️ Generated components bundle for ${id}`);
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