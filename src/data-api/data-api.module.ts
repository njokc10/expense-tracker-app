import { Module } from '@nestjs/common';

import { AuthDataApiModule } from './auth/auth.data-api.module';
import { CategoriesDataApiModule } from './categories/categories.data-api.module';
import { UsersDataApiModule } from './users/users.data-api.module';
import { TransactionsDataApiModule } from './transactions/transactions.data-api.module';

@Module({
  imports: [
    AuthDataApiModule,
    CategoriesDataApiModule,
    UsersDataApiModule,
    TransactionsDataApiModule,
  ],
})
export class DataApiModule {}
