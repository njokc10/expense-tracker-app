import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '~domain/user/user.entity';
import { AuthConfig } from '../auth.config';

@Injectable()
export class CreateAccessTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private authConfig: AuthConfig,
  ) {}

  execute(user: UserEntity): string {
    return this.jwtService.sign(
      { sub: user.id },
      {
        secret: this.authConfig.jwtTokenSecret,
        expiresIn: this.authConfig.jwtTokenExpiresIn,
      },
    );
  }
}
