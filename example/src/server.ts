import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

import setupAdmin from './admin';
import datasource from './db/datasource';
import config from './config';

const run = async (): Promise<void> => {
  await datasource.initialize();
  const app = express();
  await setupAdmin(app);

  app.use(cors({ origin: '*' }));
  app.listen(config.app.port, () => {
    console.log(
      `Example app listening on port http://localhost:${config.app.port}`
    );
  });
};

run();
