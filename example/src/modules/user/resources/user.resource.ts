import passwordsFeature from '@adminjs/passwords';
import { ResourceWithOptions } from 'adminjs';
import argon from 'argon2';

import { User } from '../entities/index.js';
import { UserRole } from '../enums/index.js';

type UserProperties = (keyof User)[];

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    listProperties: [
      'email',
      'role',
      'theme',
      'updatedAt',
    ] satisfies UserProperties,
    filterProperties: ['email', 'role', 'theme'] satisfies UserProperties,
    navigation: { icon: 'Users' },
    properties: {
      password: { isVisible: false },
      role: {
        availableValues: [
          { label: 'Admin', value: UserRole.Admin },
          { label: 'User', value: UserRole.User },
        ],
      },
    },
    actions: {
      show: {
        layout: [
          'email',
          'role',
          'theme',
          'createdAt',
          'updatedAt',
        ] satisfies UserProperties,
      },
    },
  },
  features: [
    passwordsFeature({
      properties: {
        password: 'newPassword',
        encryptedPassword: 'password',
      },
      hash: argon.hash,
    }),
  ],
};

export default UserResource;
