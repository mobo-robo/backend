import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config';
import { DatabaseModule } from '@/database';
import { HealthCheckerModule } from '@/health-checker';
import { LoggerModule } from '@/logger';
import { GatewayModule } from '@/gateway';
import { DeviceModule } from '@/device';


@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    HealthCheckerModule,
    DatabaseModule,
    DeviceModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
