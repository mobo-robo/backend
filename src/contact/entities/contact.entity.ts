import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';

import { AbstractBaseEntity } from '@/common/entities';

import { ContactRepository } from '../repositories';

@Entity({ customRepository: () => ContactRepository })
export class Contact extends AbstractBaseEntity {
  [EntityRepositoryType]?: ContactRepository;

  @Property()
  name!: string;

  @Property()
  title!: string;

  @Property()
  role!: string;

  constructor(props: Omit<Contact, keyof AbstractBaseEntity>) {
    super();
    this.name = props.name;
    this.title = props.title;
    this.role = props.role;
  }
}
