import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CategoryEntity } from '~domain/category/category.entity';

export class CategoryResDto {
  @ApiProperty()
  @Expose()
  name: string;

  constructor(data: CategoryEntity) {
    this.name = data.name;
  }
}
