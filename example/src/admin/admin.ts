import AdminJSExpress from '@adminjs/express';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { Express } from 'express';
import path from 'path';
import { DarkTheme } from '../../../src/themes';
import { themes } from './themes';

const PALETTE_PAGE = AdminJS.bundle(
  path.join(__dirname, './components/palette')
);

export const adminConfig: AdminJSOptions = {
  availableBrandings: themes.map(theme => ({ theme })),
  branding: {
    theme: DarkTheme,
    logo: '/logo_white.svg',
  },
  pages: {
    Palette: {
      component: PALETTE_PAGE,
    },
  },
};

const setupAdmin = async (app: Express): Promise<void> => {
  const adminJs = new AdminJS(adminConfig);
  const router = await AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

export default setupAdmin;
