import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '~domain/category/category.entity';

export class CategoryResDto {
  @ApiProperty()
  name: string;

  constructor(data: CategoryEntity) {
    this.name = data.name;
  }
}
