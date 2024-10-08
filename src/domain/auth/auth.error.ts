import { BaseError } from '~common/error/base.error';

export class WrongPasswordAuthError extends BaseError {
  WrongPasswordAuthError = true;
  code = WrongPasswordAuthError.name;
  constructor() {
    super({ message: 'Wrong password!' });
  }
}

export class UserNotFoundAuthError extends BaseError {
  UserNotFoundAuthError = true;
  code = UserNotFoundAuthError.name;
  constructor() {
    super({ message: 'User not found!' });
  }
}
