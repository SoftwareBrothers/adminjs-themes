import { DataSourceOptions } from 'typeorm';

import { User } from '../modules/user/index.js';
import '../config/index.js';

const options: DataSourceOptions = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User],
};

export default options;
