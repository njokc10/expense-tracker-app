import { Module } from '@nestjs/common';
import { CreateTransactionUseCase } from './use-cases/create-transaction';
import { DbModule } from '~db/db.module';

@Module({
  imports: [DbModule],
  providers: [CreateTransactionUseCase],
  exports: [CreateTransactionUseCase],
})
export class TransactionModule {}
