import { Type } from 'class-transformer';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';

import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { Environment, LogLevel } from './types';

export class RootConfig {
  @IsEnum(Environment)
  public readonly env: Environment;

  @IsEnum(LogLevel)
  public readonly log_level: LogLevel;

  @Type(() => AppConfig)
  @ValidateNested()
  @IsDefined()
  public readonly app: AppConfig;

  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  public readonly database: DatabaseConfig;

}
