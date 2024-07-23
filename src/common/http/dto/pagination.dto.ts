import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly limit: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly offset: number;
}
