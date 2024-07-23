import { Injectable, Inject } from '@nestjs/common';

import { IUserRepository } from '../user.repository';
import { USER_DB_REPOSITORY } from '~db/db.module';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_DB_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async execute(paginationQuery: { limit: number; offset: number }) {
    return this.userRepository.getAll(paginationQuery);
  }
}
