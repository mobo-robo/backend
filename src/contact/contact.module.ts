import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ContactController } from './controllers';
import { Contact } from './entities';
import { ContactServiceProvider } from './providers';

@Module({
  imports: [MikroOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactServiceProvider],
})
export class ContactModule {}
