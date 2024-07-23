import { ClsModule as _ClsModule } from 'nestjs-cls';
import { AuthAsyncCtx } from '~domain/auth/auth-async-ctx';

export const ClsModule = _ClsModule.forRoot({
  global: true,
  middleware: {
    mount: true,
  },
  proxyProviders: [AuthAsyncCtx],
});
