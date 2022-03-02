import AdminJSExpress from '@adminjs/express';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { Express } from 'express';
import path from 'path';
import { themes } from './themes';

const PALETE_PAGE = AdminJS.bundle(path.join(__dirname, './components/palete'));

export const adminConfig: AdminJSOptions = {
  branding: {
    theme: themes[0]
  },
  brandings: themes.map(theme => ({ theme })),
  pages: {
    palette: {
      component: PALETE_PAGE,
    },
  },
};

const setupAdmin = async (app: Express): Promise<void> => {
  const adminJs = new AdminJS(adminConfig);
  const router = await AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

export default setupAdmin;
