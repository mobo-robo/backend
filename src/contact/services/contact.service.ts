import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { EntityNotFoundError } from '@/common';
import { PageDto, PageMetaDto } from '@/common/dtos';

import type {
  ContactDto,
  CreateContactDto,
  FindAllContactsDto,
  UpdateContactDto,
} from '../dto';
import { Contact } from '../entities';
import { ContactRepository } from '../repositories';
import type { IContactService } from './contact.service.interface';

@Injectable()
export class ContactService implements IContactService {
  constructor(
    private readonly em: EntityManager,
    private readonly contactRepository: ContactRepository,
  ) {}

  async create(data: CreateContactDto): Promise<ContactDto> {
    const contact = new Contact(data);
    await this.em.persistAndFlush(contact);

    return contact;
  }

  async findAll(
    findAllContactsDto: FindAllContactsDto,
  ): Promise<PageDto<ContactDto>> {
    const { take, skip, order, orderBy } = findAllContactsDto;
    const [contacts, itemCount] = await this.contactRepository.findAndCount(
      {},
      { limit: take, offset: skip, orderBy: [{ [orderBy]: order }] },
    );
    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: findAllContactsDto,
      itemCount,
    });

    return new PageDto<Contact>(contacts, pageMetaDto);
  }

  async findOne(id: string): Promise<ContactDto> {
    const contact = await this.contactRepository.findOne({ id });

    if (!contact) {
      throw new EntityNotFoundError(Contact);
    }

    return contact;
  }

  async softDelete(id: string): Promise<void> {
    const contact = await this.findOne(id);
    wrap(contact).assign({ deletedAt: new Date() });

    return this.em.flush();
  }

  async update(id: string, data: UpdateContactDto): Promise<ContactDto> {
    const contact = await this.findOne(id);

    wrap(contact).assign({ ...data });
    await this.em.flush();

    return contact;
  }
}
