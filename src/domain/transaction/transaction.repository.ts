import { TransactionEntity } from './transaction.entity';

export interface ITransactionRepository {
  create(data: TransactionEntity): Promise<TransactionEntity>;

  getAll(paginationQuery: {
    limit: number;
    offset: number;
  }): Promise<TransactionEntity[]>;
}
