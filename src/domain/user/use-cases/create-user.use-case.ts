import { Injectable, Inject } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import * as argon2 from 'argon2';

import { NewUser, UserEntity } from '../user.entity';
import { IUserRepository } from '../user.repository';
import { USER_DB_REPOSITORY } from '~db/db.module';
import { EmailInUseUserError } from '../user.error';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_DB_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async execute(
    data: NewUser,
  ): Promise<Result<UserEntity, EmailInUseUserError>> {
    const user = await this.userRepository.getByEmail(data.email);

    if (user) {
      return Err(new EmailInUseUserError());
    }

    const hashedPassword = await argon2.hash(data.password);

    const newUser = await UserEntity.new({
      ...data,
      password: hashedPassword,
    }).validate();

    const createdUser = await this.userRepository.create(newUser);

    return Ok(createdUser);
  }
}
