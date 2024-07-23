import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '~domain/user/user.entity';

@Injectable()
export class CreateAccessTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute(user: UserEntity): string {
    let accessToken: string;

    const payload = { sub: user.id };
    this.jwtService.signAsync(payload).then((value) => {
      accessToken = value;
    });
    return accessToken;
  }
}
