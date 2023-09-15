import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Device } from './entities/device.entity';
import { DeviceController } from './controllers';
import { DeviceServiceProvider } from './providers';

@Module({
  imports: [MikroOrmModule.forFeature([Device])],
  controllers: [DeviceController],
  providers: [DeviceServiceProvider],
})
export class DeviceModule {}