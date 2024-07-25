import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result, Ok, Err } from 'oxide.ts';
import * as argon2 from 'argon2';

import { IUserRepository } from '~domain/user/user.repository';
import { USER_DB_REPOSITORY } from '~db/db.module';
import { UserNotFoundAuthError, WrongPasswordAuthError } from '../auth.error';
import { AuthConfig } from '../auth.config';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_DB_REPOSITORY) private userRepository: IUserRepository,
    private jwtService: JwtService,
    private authConfig: AuthConfig,
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

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.authConfig.jwtTokenSecret,
        expiresIn: this.authConfig.jwtTokenExpiresIn,
      },
    );

    return Ok(accessToken);
  }
}
