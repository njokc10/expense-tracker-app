import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClsModule } from '~common/cls/cls.module';
import { ConfigModule } from '~common/config/config.module';
import { DataApiModule } from '~data-api/data-api.module';
import { PrismaModule } from './vendor/prisma/prisma.module';
import { DbModule } from './db/db.module';
import { DomainModule } from '~domain/domain.module';

@Module({
  imports: [
    ClsModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    DataApiModule,
    DomainModule,
    DbModule,
    PrismaModule,
  ],
})
export class AppModule {}
