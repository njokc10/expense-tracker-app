import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DbModule } from '~db/db.module';

@Module({
  imports: [DbModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UserModule {}
