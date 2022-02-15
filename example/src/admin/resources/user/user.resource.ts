import { ResourceWithOptions } from 'adminjs';

import { User } from './user.entity';
import feature from '../../../../../src/index';

export const createUserResource = (): ResourceWithOptions => ({
  resource: User,
  options: {
    navigation: {
      icon: 'User',
      name: 'Users',
    },
  },
  features: [feature()],
});
