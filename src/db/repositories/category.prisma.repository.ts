import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '~domain/category/category.entity';
import { ICategoryRepository } from '~domain/category/category.repository';

import { PrismaService } from '~vendor/prisma/prisma.service';

@Injectable()
export class CategoryPrismaRepository implements ICategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CategoryEntity) {
    const category = await this.prismaService.client.category.create({
      data: data.toPersist('create'),
    });

    return CategoryEntity.toDomain(category);
  }

  async getAll() {
    const categories = await this.prismaService.client.category.findMany();

    return categories
      ? categories.map((category) => CategoryEntity.toDomain(category))
      : [];
  }
}
