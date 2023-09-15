import type { Options } from '@mikro-orm/core';
import { IsNumber, IsString } from 'class-validator';
import path from 'path';

export class DatabaseConfig {
  @IsString()
  public readonly name!: string;

  @IsString()
  public readonly host!: string;

  @IsNumber()
  public readonly port!: number;

  @IsString()
  public readonly user!: string;

  @IsString()
  public readonly password!: string;

  public getMikrOrmCOnfig(): Options {
    return {
      type: 'postgresql',
      port: this.port,
      host: this.host,
      dbName: this.name,
      user: this.user,
      password: this.password,
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      migrations: {
        tableName: 'migrations',
        path: path.join(__dirname, '../database/migrations'),
        glob: '!(*.d).{js,ts}',
      },
    };
  }
}
