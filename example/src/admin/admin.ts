import AdminJSExpress from '@adminjs/express';
import MongooseAdapter from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { Express } from 'express';

import { createUserResource } from './resources/user/user.resource';

const setupAdmin = async (app: Express): Promise<void> => {
  AdminJS.registerAdapter(MongooseAdapter);
  const adminJs = new AdminJS({
    resources: [createUserResource()],
  });

  const router = await AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

export default setupAdmin;
