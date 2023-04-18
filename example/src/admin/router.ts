import ExpressPlugin from '@adminjs/express';
import AdminJS from 'adminjs';

import { session } from '../config/index.js';
import { authenticate, sessionStore } from './auth.js';

export const getAdminRouter = (admin: AdminJS) => {
  const router = ExpressPlugin.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: session.secret as string,
      cookieName: 'adminjs',
      authenticate,
    },
    null,
    {
      secret: session.secret,
      saveUninitialized: session.saveUninitialized,
      resave: session.resave,
      store: sessionStore,
    }
  );

  return router;
};

export default getAdminRouter;
