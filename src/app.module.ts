import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config';
import { DatabaseModule } from '@/database';
import { HealthCheckerModule } from '@/health-checker';
import { LoggerModule } from '@/logger';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    HealthCheckerModule,
    DatabaseModule,
    DeviceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
