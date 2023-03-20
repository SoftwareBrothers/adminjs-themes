import { DataSource } from 'typeorm';

import config from './config';

export default new DataSource(config);
