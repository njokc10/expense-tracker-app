import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class PrismaConfig {
  @IsString()
  dbUsername!: string;

  @IsString()
  dbPassword!: string;

  @IsString()
  dbHost!: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  dbPort!: number;

  @IsString()
  dbName!: string;

  @IsBoolean()
  runMigrations!: boolean;
}
