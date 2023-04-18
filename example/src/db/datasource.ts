import { DataSource } from 'typeorm';

import config from './config.js';

export default new DataSource(config);
