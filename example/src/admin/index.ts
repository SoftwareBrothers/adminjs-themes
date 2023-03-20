import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { Express } from 'express';

import { UserResource } from '../modules/user';
import { componentLoader } from './component-loader';

import { dark, light, wide } from '../../../';
import config from '../config';
import getAdminRouter from './router';

AdminJS.registerAdapter({ Database, Resource });

const setupAdmin = async (app: Express): Promise<void> => {
  const admin = new AdminJS({
    resources: [UserResource],
    componentLoader,
    rootPath: '/',
    availableThemes: [wide, light, dark],
    defaultTheme: 'wide',
  });

  if (config.app.env === 'production') {
    admin.initialize();
  } else {
    admin.watch();
  }

  const router = getAdminRouter(admin);
  app.use(admin.options.rootPath, router);
};

export default setupAdmin;
