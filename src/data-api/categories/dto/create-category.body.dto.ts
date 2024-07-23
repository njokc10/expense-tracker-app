import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryBodyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
