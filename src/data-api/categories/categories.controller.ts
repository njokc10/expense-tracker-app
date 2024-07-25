import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateCategoryUseCase } from '~domain/category/use-cases/create-category.use-case';
import { GetCategoriesUseCase } from '~domain/category/use-cases/get-categories.use-case';
import { CreateCategoryBodyDto } from './dto/create-category.body.dto';
import { CategoryResDto } from './dto/category.res.dto';
import { PaginationDto } from '~common/http/dto/pagination.dto';
import { API_V1_PATH } from '~common/http/http.constant';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '~data-api/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller(`${API_V1_PATH}/categories`)
export class CategoriesController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
  ) {}

  @ApiOkResponse({ type: CategoryResDto })
  @Post()
  async create(@Body() data: CreateCategoryBodyDto): Promise<CategoryResDto> {
    const category = await this.createCategoryUseCase.execute(data);
    return new CategoryResDto(category);
  }

  @Get(':id')
  getOne(@Param('id') categoryId: string) {
    return categoryId;
  }

  @ApiOkResponse({ type: CategoryResDto })
  @Get()
  async getAll(
    @Query() paginationQuery: PaginationDto,
  ): Promise<CategoryResDto[]> {
    const categories = await this.getCategoriesUseCase.execute(paginationQuery);

    return categories.map(
      (category): CategoryResDto => new CategoryResDto(category),
    );
  }
}
