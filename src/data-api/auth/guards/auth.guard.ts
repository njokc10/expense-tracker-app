import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { match, P } from 'ts-pattern';

import { ClientRequest } from '~common/http/interfaces/client-request.interface';
import {
  InvalidAccessTokenAuthError,
  UserNotFoundAuthError,
} from '~domain/auth/auth.error';
import { VerifyAccessTokenUseCase } from '~domain/auth/use-cases/verify-access-token.use-case';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private verifyAccessTokenUseCase: VerifyAccessTokenUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const result = await this.verifyAccessTokenUseCase.execute(token);

    return result
      .mapErr((error): void => {
        match(error)
          .with(P.instanceOf(InvalidAccessTokenAuthError), (error) => {
            throw new UnauthorizedException(error, { cause: error });
          })
          .with(P.instanceOf(UserNotFoundAuthError), (error) => {
            throw new UnauthorizedException(error, { cause: error });
          })
          .exhaustive();
      })
      .map(() => true)
      .unwrap();
  }

  private extractTokenFromHeader(request: ClientRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
