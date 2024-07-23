import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthModule } from '~domain/auth/auth.module';
import { UserModule } from '~domain/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AuthController],
})
export class AuthDataApiModule {}
