import { Inject, Injectable } from '@nestjs/common';

import { NewTransaction, TransactionEntity } from '../transaction.entity';
import { ITransactionRepository } from '../transaction.repository';
import { TRANSACTION_DB_REPOSITORY } from '~db/db.module';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_DB_REPOSITORY)
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(data: NewTransaction) {
    const newTransaction = await TransactionEntity.new(data).validate();
    return this.transactionRepository.create(newTransaction);
  }
}
