import { Repository } from 'typeorm';

import dataSource from '../../../db/datasource';
import { User } from '../entities';

class UserService {
  protected userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  public async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  public async findUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}

export default UserService;
