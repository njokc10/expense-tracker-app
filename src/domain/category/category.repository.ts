import { CategoryEntity } from './category.entity';

export interface ICategoryRepository {
  create(data: CategoryEntity): Promise<CategoryEntity>;

  getAll(paginationQuery: {
    limit: number;
    offset: number;
  }): Promise<CategoryEntity[]>;
}
