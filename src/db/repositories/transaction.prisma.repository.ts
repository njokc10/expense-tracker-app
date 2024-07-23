import { TransactionEntity } from '~domain/transaction/transaction.entity';
import { ITransactionRepository } from '~domain/transaction/transaction.repository';
import { PrismaService } from '~vendor/prisma/prisma.service';

export class TransactionPrismaRepository implements ITransactionRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: TransactionEntity) {
    const transaction = await this.prismaService.client.transaction.create({
      data: data.toPersist('create'),
    });
    return TransactionEntity.toDomain(transaction);
  }

  async getAll(paginationQuery: { limit: number; offset: number }) {
    const { limit, offset } = paginationQuery;

    const transactions = await this.prismaService.client.transaction.findMany();

    return transactions
      ? transactions.map((transaction) =>
          TransactionEntity.toDomain(transaction),
        )
      : [];
  }
}
