import { Column, Entity, Index } from 'typeorm';

import { RootEntity } from '../../../utils/root-entity.js';
import { UserRole } from '../enums/index.js';

export interface IUser {
  email: string;
  password: string;
  theme?: string;
  role?: UserRole;
}

@Entity({ name: 'users' })
class User extends RootEntity implements IUser {
  @Column({ name: 'email', type: 'varchar', length: 128, unique: true })
  @Index()
  public email!: string;

  @Column({ name: 'password', type: 'text' })
  public password!: string;

  @Column({ name: 'theme', type: 'text', nullable: true })
  public theme!: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false,
  })
  @Index()
  public role!: UserRole;
}

export default User;
