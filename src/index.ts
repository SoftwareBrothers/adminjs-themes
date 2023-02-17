#!/usr/bin/env node
import { program } from 'commander';
import { bundle } from './bundle';

program.name('themes').description('AdminJS Themes CLI');

program
  .command('bundle')
  .argument('<path>', 'Path to directory containing themes')
  .option('-o, --output <directory>', 'Output directory', './lib')
  .action(async (path, options) => {
    try {
      await bundle(path, options.output);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse(process.argv);
