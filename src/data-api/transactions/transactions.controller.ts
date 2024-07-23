import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateTransactionBodyDto } from './dto/create-transaction.body.dto';
import { TransactionResDto } from './dto/transaction.res.dto';
import { CreateTransactionUseCase } from '~domain/transaction/use-cases/create-transaction';
import { API_V1_PATH } from '~common/http/http.constant';

@Controller(`${API_V1_PATH}/transactions`)
export class TransactionsController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  /*
  @ApiOkResponse({ type: TransactionResDto })
  @Post()
  async create(
    @Body() data: CreateTransactionBodyDto,
  ): Promise<TransactionResDto> {
    // Get userId from Jwt
    const transaction = await this.createTransactionUseCase.execute(data);
    return new TransactionResDto(transaction);
  }
    */

  @Get()
  async getAll() {}
}
