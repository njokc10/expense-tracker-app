import { Inject, Injectable } from '@nestjs/common';

import { CATEGORY_DB_REPOSITORY } from '~db/db.module';
import { ICategoryRepository } from '../category.repository';

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_DB_REPOSITORY)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(paginationQuery: { limit: number; offset: number }) {
    return this.categoryRepository.getAll(paginationQuery);
  }
}
