import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import app from './app';
import session from './session';

export default {
  app,
  session,
};
