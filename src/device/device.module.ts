import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Device } from './entities/device.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Device])],
  controllers: [],
  providers: [],
})
export class DeviceModule {}