#!/usr/bin/env node
import { program } from 'commander';
import { bundle } from './bundle.js';
import { generate } from './generate.js';

program
  .name('adminjs-themes')
  .description('AdminJS Themes CLI')
  .addCommand(bundle)
  .addCommand(generate)
  .parse(process.argv);
