import { Module } from '@nestjs/common';

import { DbModule } from '~db/db.module';
import { CreateCategoryUseCase } from './use-cases/create-category.use-case';
import { GetCategoriesUseCase } from './use-cases/get-categories.use-case';
import { GetCategoryUseCase } from './use-cases/get-category.use-case';

@Module({
  imports: [DbModule],
  providers: [CreateCategoryUseCase, GetCategoriesUseCase, GetCategoryUseCase],
  exports: [CreateCategoryUseCase, GetCategoriesUseCase, GetCategoryUseCase],
})
export class CategoryModule {}
