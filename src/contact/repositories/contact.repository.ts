import { EntityRepository } from '@mikro-orm/core';

import type { Contact } from '../entities';

export class ContactRepository extends EntityRepository<Contact> {}
