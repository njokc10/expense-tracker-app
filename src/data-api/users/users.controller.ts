import { Controller, Get, Param, Query } from '@nestjs/common';

import { API_V1_PATH } from '~common/http/http.constant';
import { PaginationDto } from '~common/http/dto/pagination.dto';

@Controller(`${API_V1_PATH}/users`)
export class UsersController {
  constructor() {}

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return userId;
  }

  @Get()
  getAll(@Query() paginationQuery: PaginationDto) {
    console.log(paginationQuery);
  }
}
