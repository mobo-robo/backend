import { LoggerModule } from '@/logger';
import { Logger, Module } from '@nestjs/common';

import { ClientGateway } from './client.gateway';

@Module({
  imports: [LoggerModule],
  providers: [ClientGateway]
})
export class GatewayModule {}