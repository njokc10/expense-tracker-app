import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';

import { PrismaConfig } from '~vendor/prisma/prisma.config';
import { AuthConfig } from '~domain/auth/auth.config';

export class AppConfig {
  @IsNumber()
  port!: number;
}

export class Config {
  @Type(() => AppConfig)
  @ValidateNested()
  public readonly app!: AppConfig;

  @Type(() => PrismaConfig)
  @IsObject()
  @ValidateNested()
  public readonly prisma!: PrismaConfig;

  @Type(() => AuthConfig)
  @IsObject()
  @ValidateNested()
  public readonly auth!: AuthConfig;
}
