import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class TransactionResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: TransactionType;

  @ApiProperty()
  createdAt: Date;

  constructor(data: TransactionResDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.amount = data.amount;
    this.type = data.type;
    this.createdAt = data.createdAt;
  }
}
