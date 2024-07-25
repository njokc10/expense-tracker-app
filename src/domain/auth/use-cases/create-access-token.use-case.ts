import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '~domain/user/user.entity';

@Injectable()
export class CreateAccessTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute(user: UserEntity): string {
    return this.jwtService.sign({ sub: user.id });
  }
}
