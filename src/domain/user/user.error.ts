import { BaseError } from '~common/error/base.error';

export class EmailInUseUserError extends BaseError {
  EmailInUseUserError = true;
  code = EmailInUseUserError.name;
  constructor() {
    super({ message: 'Email in use!' });
  }
}
