#!/usr/bin/env node
import { createCommand } from 'commander';
import { generateTheme } from './actions/generateTheme.js';

export const generate = createCommand('generate')
  .description('New theme generator')
  .argument('<name>', 'Name of theme')
  .option('--description <string>', 'Theme description', undefined)
  .option('--output <directory>', 'Output directory', './src/themes')
  .action(async (name, options) => {
    try {
      await generateTheme(name, options.description, options.output);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
