import AdminJS from 'adminjs';
import ExpressPlugin from '@adminjs/express';

import config from '../config/index.js';

import { authenticate, sessionStore } from './auth.js';

export const getAdminRouter = (admin: AdminJS) => {
  const router = ExpressPlugin.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: config.session.secret as string,
      cookieName: 'adminjs',
      authenticate,
    },
    null,
    {
      secret: config.session.secret,
      saveUninitialized: config.session.saveUninitialized,
      resave: config.session.resave,
      store: sessionStore,
    }
  );

  return router;
};

export default getAdminRouter;
