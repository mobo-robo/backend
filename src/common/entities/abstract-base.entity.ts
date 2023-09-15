import { Index, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { SoftDelete } from '@/database/decorators';

@SoftDelete()
export abstract class AbstractBaseEntity {
  @PrimaryKey()
  id: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Index()
  @Property({ nullable: true })
  deletedAt?: Date;
}
