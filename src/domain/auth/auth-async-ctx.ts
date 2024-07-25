import { InjectableProxy } from 'nestjs-cls';

import { UserEntity } from '~domain/user/user.entity';
import { Inject } from '@nestjs/common';
import { USER_DB_REPOSITORY } from '~db/db.module';
import { IUserRepository } from '~domain/user/user.repository';

@InjectableProxy()
export class AuthAsyncCtx {
  private _currentUser!: UserEntity;

  constructor(
    @Inject(USER_DB_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  get currentUser() {
    return this._currentUser;
  }

  async init(userId: string) {
    const user = await this.userRepository.getById(userId);

    if (user) {
      this._currentUser = user;
    }

    return user;
  }
}
