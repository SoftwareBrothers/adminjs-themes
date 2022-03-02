import express from 'express';
import setupAdmin from './admin/admin';

const app = express();
const port = 3001;

const run = async (): Promise<void> => {
  await setupAdmin(app);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

run();
