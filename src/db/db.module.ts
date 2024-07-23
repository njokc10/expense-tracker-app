import { Module } from '@nestjs/common';

import { PrismaModule } from '~vendor/prisma/prisma.module';
import { UserPrismaRepository } from './repositories/user.prisma.repository';
import { CategoryPrismaRepository } from './repositories/category.prisma.repository';
import { TransactionPrismaRepository } from './repositories/transaction.prisma.repository';

export const USER_DB_REPOSITORY = Symbol('UserDbRepositoryKey');
export const CATEGORY_DB_REPOSITORY = Symbol('CategoryDbRepositoryKey');
export const TRANSACTION_DB_REPOSITORY = Symbol('TransactionDbRepositoryKey');

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: USER_DB_REPOSITORY, useClass: UserPrismaRepository },
    { provide: CATEGORY_DB_REPOSITORY, useClass: CategoryPrismaRepository },
    {
      provide: TRANSACTION_DB_REPOSITORY,
      useClass: TransactionPrismaRepository,
    },
  ],
  exports: [
    USER_DB_REPOSITORY,
    CATEGORY_DB_REPOSITORY,
    TRANSACTION_DB_REPOSITORY,
  ],
})
export class DbModule {}
