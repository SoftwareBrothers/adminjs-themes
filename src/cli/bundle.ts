#!/usr/bin/env node
import { createCommand } from 'commander';
import { bundleTheme } from './actions/bundleTheme.js';

export const bundle = createCommand('bundle')
  .description('Themes bundler')
  .argument('<path>', 'Path to directory containing themes')
  .option('-t, --theme <directory>', 'Output directory', undefined)
  .option('-o, --output <directory>', 'Output directory', './lib')
  .action(async (path, options) => {
    try {
      await bundleTheme(path, options.output, options.theme);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
