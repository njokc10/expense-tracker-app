import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Err, Ok, Result } from 'oxide.ts';

import { AuthConfig } from '../auth.config';
import {
  InvalidAccessTokenAuthError,
  UserNotFoundAuthError,
} from '../auth.error';
import { AuthAsyncCtx } from '../auth-async-ctx';
import { UserEntity } from '~domain/user/user.entity';

type JwtPayload = {
  sub: string;
};

@Injectable()
export class VerifyAccessTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private authConfig: AuthConfig,
    private authAsyncCtx: AuthAsyncCtx,
  ) {}

  async execute(
    token: string,
  ): Promise<
    Result<UserEntity, InvalidAccessTokenAuthError | UserNotFoundAuthError>
  > {
    const payload = (await this.jwtService.verifyAsync(token, {
      secret: this.authConfig.jwtTokenSecret,
    })) as JwtPayload;

    if (!payload) {
      return Err(new InvalidAccessTokenAuthError());
    }

    const currentUser = await this.setUserAsyncCtx(payload);

    if (!currentUser) {
      return Err(new UserNotFoundAuthError());
    }

    return Ok(currentUser);
  }

  private setUserAsyncCtx(payload: JwtPayload) {
    return this.authAsyncCtx.init(payload.sub);
  }
}
