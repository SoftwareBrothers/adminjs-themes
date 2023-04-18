import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

import setupAdmin from './admin/index.js';
import datasource from './db/datasource.js';
import { app as appConfig } from './config/index.js';

await datasource.initialize();
const app = express();
await setupAdmin(app);

app.use(cors({ origin: '*' }));
app.listen(appConfig.port, () => {
  console.log(
    `Example app listening on port http://localhost:${appConfig.port}`
  );
});
