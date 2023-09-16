import { DeviceModule } from '@/device';
import { LoggerModule } from '@/logger';
import { Module } from '@nestjs/common';

import { ClientGateway } from './client.gateway';

@Module({
  imports: [LoggerModule,DeviceModule],
  providers: [ClientGateway]
})
export class GatewayModule {}