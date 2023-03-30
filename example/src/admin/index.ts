import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { Express } from 'express';
import { dark, light, wide } from '@adminjs/themes';

import { UserResource } from '../modules/user/index.js';
import { componentLoader } from './component-loader.js';

import config from '../config/index.js';
import getAdminRouter from './router.js';

AdminJS.registerAdapter({ Database, Resource });

const setupAdmin = async (app: Express): Promise<void> => {
  const admin = new AdminJS({
    resources: [UserResource],
    componentLoader,
    rootPath: '/',
    defaultTheme: 'light',
    availableThemes: [
      wide,
      light,
      dark,
      // {
      //   id: 'theme',
      //   name: 'Custom theme',
      //   data: {},
      //   bundlePath: `themes/theme/theme.bundle.js`,
      //   stylePath: `themes/theme/style.css`,
      // },
    ],
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
