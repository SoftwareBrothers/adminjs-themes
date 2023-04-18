import argon from 'argon2';
import PostgresSession from 'connect-pg-simple';
import session from 'express-session';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

import databaseConfig from '../db/config.js';
import { UserService } from '../modules/user/index.js';

const PostgresStore = PostgresSession(session);

export const sessionStore = new PostgresStore({
  conObject: {
    connectionString: (databaseConfig as PostgresConnectionOptions).url,
    ssl: (databaseConfig as PostgresConnectionOptions).extra?.ssl,
  },
  tableName: 'sessions',
  createTableIfMissing: true,
});

export const authenticate = async (email: string, password: string) => {
  const userService = new UserService();
  const user = await userService.findUserByEmail(email);

  if (user && (await argon.verify(user.password, password))) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      theme: user.theme,
    };
  }

  return null;
};
