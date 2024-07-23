import { Global, Module } from '@nestjs/common';
import { CreateAccessTokenUseCase } from './use-cases/create-access-token.use-case';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './use-cases/login.use-case';
import { DbModule } from '~db/db.module';

@Global()
@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' }), DbModule],
  providers: [CreateAccessTokenUseCase, LoginUseCase],
  exports: [CreateAccessTokenUseCase, LoginUseCase],
})
export class AuthModule {}
