import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserModule } from '~domain/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UsersController],
})
export class UsersDataApiModule {}
