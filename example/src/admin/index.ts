import { dark, noSidebar } from '@adminjs/themes';
import { Database, Resource } from '@adminjs/typeorm';
import AdminJS, { ThemeConfig } from 'adminjs';
import { Express } from 'express';
import path from 'path';
import * as url from 'url';

import { app as appConfig } from '../config/index.js';
import { UserResource } from '../modules/user/index.js';
import { themeConfig } from '../themes/my-custom-theme/index.js';
import { componentLoader } from './component-loader.js';
import { getAdminRouter } from './router.js';

AdminJS.registerAdapter({ Database, Resource });

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const getThemeDir = (theme: string) =>
  path.join(__dirname, `../themes/${theme}`);

const setupAdmin = async (app: Express): Promise<void> => {
  const admin = new AdminJS({
    resources: [UserResource],
    componentLoader,
    rootPath: '/',
    branding: {
      theme: {
        colors: {
          primary100: '#26A69A',
        },
      },
    },
    defaultTheme: themeConfig.id,
    availableThemes: [
      noSidebar,
      dark,
      {
        ...themeConfig,
        bundlePath: `${getThemeDir(themeConfig.id)}/theme.bundle.js`,
        stylePath: `${getThemeDir(themeConfig.id)}/style.css`,
      } as ThemeConfig,
    ],
  });

  if (appConfig.env === 'production') {
    admin.initialize();
  } else {
    admin.watch();
  }

  const router = getAdminRouter(admin);
  app.use(admin.options.rootPath, router);
};

export default setupAdmin;
