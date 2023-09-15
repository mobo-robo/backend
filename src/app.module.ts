import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config';
import { ContactModule } from '@/contact';
import { DatabaseModule } from '@/database';
import { HealthCheckerModule } from '@/health-checker';
import { LoggerModule } from '@/logger';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    HealthCheckerModule,
    DatabaseModule,
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
