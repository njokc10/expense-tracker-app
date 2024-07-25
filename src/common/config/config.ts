import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';

import { PrismaConfig } from '~vendor/prisma/prisma.config';
import { LoggerConfig } from '~common/logging/logger.config';
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

  @Type(() => LoggerConfig)
  @IsObject()
  @ValidateNested()
  public readonly logger!: LoggerConfig;

  @Type(() => AuthConfig)
  @IsObject()
  @ValidateNested()
  public readonly auth!: AuthConfig;
}
