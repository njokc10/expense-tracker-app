import { Module } from '@nestjs/common';
import { TransactionModule } from '~domain/transaction/transaction.module';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [TransactionModule],
  controllers: [TransactionsController],
})
export class TransactionsDataApiModule {}
