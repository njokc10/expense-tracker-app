import { Expose } from 'class-transformer';
import { randomUUID } from 'crypto';

import { BaseEntity, trackChanges } from '~common/entity/base.entity';
import { ICategory } from './interfaces/category.interface';

export type NewCategory = Pick<ICategory, 'name'>;

export class CategoryEntity
  extends BaseEntity<CategoryEntity>
  implements ICategory
{
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  private constructor(data: ICategory) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static new(data: NewCategory) {
    return new CategoryEntity({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    });
  }

  static toDomain(data: ICategory) {
    return trackChanges<CategoryEntity>(new CategoryEntity(data));
  }
}
