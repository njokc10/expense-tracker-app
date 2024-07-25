import { BaseError } from '~common/error/base.error';

export class EmailInUseUserError extends BaseError {
  EmailInUseUserError = true;
  code = EmailInUseUserError.name;
  constructor() {
    super({ message: 'Email in use!' });
  }
}

export class NotFoundUserError extends BaseError {
  NotFoundUserError = true;
  code = NotFoundUserError.name;
  constructor() {
    super({ message: 'User not found!' });
  }
}
