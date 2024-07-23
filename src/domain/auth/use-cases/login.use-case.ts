import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result, Ok, Err } from 'oxide.ts';
import * as argon2 from 'argon2';

import { IUserRepository } from '~domain/user/user.repository';
import { USER_DB_REPOSITORY } from '~db/db.module';
import { UserNotFoundAuthError, WrongPasswordAuthError } from '../auth.error';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_DB_REPOSITORY) private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Result<string, UserNotFoundAuthError | WrongPasswordAuthError>> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      return Err(new UserNotFoundAuthError());
    }

    const correctPassword = await argon2.verify(user.password, password);

    if (!correctPassword) {
      return Err(new WrongPasswordAuthError());
    }

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return Ok(accessToken);
  }
}
