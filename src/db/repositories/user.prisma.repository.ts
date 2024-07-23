import { Injectable } from '@nestjs/common';
import { PaginationDto } from '~common/http/dto/pagination.dto';

import { UserEntity } from '~domain/user/user.entity';
import { IUserRepository } from '~domain/user/user.repository';

import { PrismaService } from '~vendor/prisma/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: UserEntity) {
    const user = await this.prismaService.client.user.create({
      data: data.toPersist('create'),
    });
    return UserEntity.toDomain(user);
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.client.user.findUnique({
      where: {
        email,
      },
    });
    return user ? UserEntity.toDomain(user) : null;
  }

  async getAll(paginationQuery: PaginationDto) {
    const { limit, offset } = paginationQuery;

    const users = await this.prismaService.client.user.findMany();

    return users ? users.map((user) => UserEntity.toDomain(user)) : [];
  }
}
