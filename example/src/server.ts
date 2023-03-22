import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

import setupAdmin from './admin/index.js';
import datasource from './db/datasource.js';
import config from './config/index.js';

await datasource.initialize();
const app = express();
await setupAdmin(app);

app.use(cors({ origin: '*' }));
app.listen(config.app.port, () => {
  console.log(
    `Example app listening on port http://localhost:${config.app.port}`
  );
});
