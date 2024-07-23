import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({})
export class DomainModule {
  imports: [AuthModule, CategoryModule, TransactionModule, UserModule];
}
