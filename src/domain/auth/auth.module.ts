import { Global, Module } from '@nestjs/common';
import { CreateAccessTokenUseCase } from './use-cases/create-access-token.use-case';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './use-cases/login.use-case';
import { DbModule } from '~db/db.module';
import { VerifyAccessTokenUseCase } from './use-cases/verify-access-token.use-case';

@Global()
@Module({
  imports: [JwtModule, DbModule],
  providers: [CreateAccessTokenUseCase, VerifyAccessTokenUseCase, LoginUseCase],
  exports: [CreateAccessTokenUseCase, VerifyAccessTokenUseCase, LoginUseCase],
})
export class AuthModule {}
