#!/usr/bin/env node
import { createCommand } from 'commander';
import { bundleTheme } from './actions/bundleTheme.js';

export const bundle = createCommand('bundle')
  .description('Themes components bundler')
  .argument(
    '[theme]',
    'The ID of the theme to bundle. If not provided, all themes in the input directory will be bundled.'
  )
  .option(
    '-i, --input <directory>',
    'The directory containing the themes.',
    './src/themes'
  )
  .action(async (theme, options) => {
    try {
      await bundleTheme(options.input, theme);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
