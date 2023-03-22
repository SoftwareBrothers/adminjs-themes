import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import app from './app.js';
import session from './session.js';

export default {
  app,
  session,
};
