import type { PageDto, PageOptionsDto } from '@/common/dtos';

import type { ContactDto, CreateContactDto, UpdateContactDto } from '../dto';

export interface IContactService {
  create(data: CreateContactDto): Promise<ContactDto>;
  findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ContactDto>>;
  findOne(id: string): Promise<ContactDto>;
  update(id: string, data: UpdateContactDto): Promise<ContactDto>;
  softDelete(id: string): Promise<void>;
}
