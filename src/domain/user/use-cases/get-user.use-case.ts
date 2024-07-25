import { Injectable, Inject } from '@nestjs/common';
import { Result, Err, Ok } from 'oxide.ts';

import { UserEntity } from '../user.entity';
import { IUserRepository } from '../user.repository';
import { USER_DB_REPOSITORY } from '~db/db.module';
import { NotFoundUserError } from '../user.error';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_DB_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
  ): Promise<Result<UserEntity, NotFoundUserError>> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      return Err(new NotFoundUserError());
    }

    return Ok(user);
  }
}
