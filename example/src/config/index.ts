import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import { config as app } from './app.js';
import { config as session } from './session.js';

export { app, session };
