#!/usr/bin/env node
import { createCommand } from 'commander';
import { bundleTheme } from './actions/bundleTheme.js';

export const bundle = createCommand('bundle')
  .description('Themes bundler')
  .argument('<path>', 'Path to directory containing themes')
  .option('--output <directory>', 'Output directory', './lib')
  .option('--root <directory>', 'Root directory', undefined)
  .action(async (path, options) => {
    try {
      await bundleTheme(path, options.output, options.root);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
