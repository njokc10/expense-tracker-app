import { TransactionType } from '@prisma/client'; // not good... create interface
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
