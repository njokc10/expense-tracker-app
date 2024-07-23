import { UserEntity } from './user.entity';

export interface IUserRepository {
  create(data: UserEntity): Promise<UserEntity>;

  getByEmail(email: string): Promise<UserEntity | null>;

  getAll(paginationQuery: {
    limit: number;
    offset: number;
  }): Promise<UserEntity[]>;
}
