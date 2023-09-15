import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config';
import { ContactModule } from '@/contact';
import { DatabaseModule } from '@/database';
import { HealthCheckerModule } from '@/health-checker';
import { LoggerModule } from '@/logger';
import { DeviceModule } from '@/device';
import { GatewayModule } from '@/gateway';


@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    HealthCheckerModule,
    DatabaseModule,
    ContactModule,
    DeviceModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
