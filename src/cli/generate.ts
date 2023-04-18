#!/usr/bin/env node
import { createCommand } from 'commander';
import { generateTheme } from './actions/generateTheme.js';

export const generate = createCommand('generate')
  .description('New theme generator')
  .argument(
    '<name>',
    'The name of the theme to generate. Name is converted to theme ID in kebab case.'
  )
  .option('--description <string>', 'The description of the theme.', undefined)
  .option(
    '--output <directory>',
    'The output directory where the theme will be generated.',
    './src/themes'
  )
  .action(async (name, options) => {
    try {
      await generateTheme(name, options.description, options.output);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
