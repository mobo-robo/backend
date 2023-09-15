import {
  dotenvLoader,
  selectConfig,
  TypedConfigModule,
} from 'nest-typed-config';

import { RootConfig } from '@/config';
import { DatabaseConfig } from '@/config/database.config';
import { EnvLoaderOptions } from '@/config/dotenvLoaderOptions';
import { normalize } from '@/config/utils/normalize';

export const ConfigModule = TypedConfigModule.forRoot({
  schema: RootConfig,
  load: dotenvLoader(EnvLoaderOptions),
  normalize,
});

const databaseConfig = selectConfig(ConfigModule, DatabaseConfig);
export default databaseConfig.getMikrOrmCOnfig();
