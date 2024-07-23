import { Module } from '@nestjs/common';
import { CategoryModule } from '~domain/category/category.module';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [CategoryModule],
  controllers: [CategoriesController],
})
export class CategoriesDataApiModule {}
