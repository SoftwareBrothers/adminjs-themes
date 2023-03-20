import { DataSourceOptions } from 'typeorm';
import { User } from '../modules/user';
import '../config';

const options: DataSourceOptions = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User],
};

export default options;
