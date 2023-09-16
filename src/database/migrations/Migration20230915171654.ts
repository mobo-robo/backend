import { Migration } from '@mikro-orm/migrations';

export class Migration20230915171654 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" add column "is_connected" boolean DEFAULT FALSE;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop column "is_connected";');
  }

}
