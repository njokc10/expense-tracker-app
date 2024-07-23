import { Inject, Injectable } from '@nestjs/common';

import { CATEGORY_DB_REPOSITORY } from '~db/db.module';
import { ICategoryRepository } from '../category.repository';
import { CategoryEntity, NewCategory } from '../category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_DB_REPOSITORY)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: NewCategory) {
    const newCategory = await CategoryEntity.new(data).validate();
    return this.categoryRepository.create(newCategory);
  }
}
