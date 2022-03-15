import express from 'express';
import setupAdmin from './admin/admin';
import path from 'path';

const app = express();
const port = 3001;

const run = async (): Promise<void> => {
  await setupAdmin(app);
  app.use(express.static(path.join(__dirname, 'assets')));
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

run();
