import { BaseEntity, trackChanges } from '~common/entity/base.entity';
import { ITransaction } from './interfaces/transaction.interface';
import { Expose } from 'class-transformer';
import { TransactionType } from '@prisma/client';
import { randomUUID } from 'crypto';

export type NewTransaction = Pick<
  ITransaction,
  'name' | 'description' | 'amount' | 'type' | 'userId' | 'categoryId'
>;

export type UpdateTransaction = Omit<
  NewTransaction,
  'id' | 'userId' | 'categoryId' | 'createdAt'
>;

export class TransactionEntity
  extends BaseEntity<TransactionEntity>
  implements ITransaction
{
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  amount: number;

  @Expose()
  type: TransactionType;

  @Expose()
  userId: string;

  @Expose()
  categoryId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  private constructor(data: ITransaction) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.amount = data.amount;
    this.type = data.type;
    this.userId = data.userId;
    this.categoryId = data.categoryId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static new(data: NewTransaction) {
    return new TransactionEntity({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    });
  }

  update(changes: UpdateTransaction) {
    return Object.assign(this, { ...changes, updatedAt: new Date() });
  }

  static toDomain(data: ITransaction) {
    return trackChanges<TransactionEntity>(new TransactionEntity(data));
  }
}
