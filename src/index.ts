#!/usr/bin/env node
import { program } from 'commander';
import { bundle } from './bundle.js';

program.name('themes').description('AdminJS Themes CLI');

program
  .command('bundle')
  .argument('<path>', 'Path to directory containing themes')
  .option('-o, --output <directory>', 'Output directory', './lib')
  .option('-r, --root <directory>', 'Root directory', undefined)
  .action(async (path, options) => {
    try {
      await bundle(path, options.output, options.root);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse(process.argv);
