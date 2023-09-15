import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from 'nestjs-pino';

import { ConfigModule, RootConfig } from '@/config';
import { Environment } from '@/config/types';

export const DatabaseModule = MikroOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [RootConfig, Logger],
  useFactory: (config: RootConfig, pinoLogger: Logger) => ({
    ...config.database.getMikrOrmCOnfig(),
    debug: config.env !== Environment.PROD,
    logger: pinoLogger.log.bind(pinoLogger),
    highlighter: new SqlHighlighter(),
  }),
});
