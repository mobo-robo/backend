import { Migration } from '@mikro-orm/migrations';

export class Migration20230625095337 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(
      // eslint-disable-next-line max-len
      'create table "contact" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "title" varchar(255) not null, "role" varchar(255) not null, constraint "contact_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "contact_deleted_at_index" on "contact" ("deleted_at");',
    );
  }
}
