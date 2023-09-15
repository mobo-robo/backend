import { Migration } from '@mikro-orm/migrations';

export class Migration20230915065154 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "device" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "device_id" varchar(255) not null, "secret" varchar(255) not null, "geo_location" varchar(255) not null, constraint "device_pkey" primary key ("id"));');
    this.addSql('create index "device_deleted_at_index" on "device" ("deleted_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "device" cascade;');
  }

}
