import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Device } from '../entities/device.entity';
import crypto from "crypto";
import { DeviceRepository } from '../repositories/device.repository';
import { plainToClass } from 'class-transformer';
import { nanoid } from 'nanoid'

@Injectable()
export class DeviceService {
  constructor(
    private readonly em: EntityManager,
  ) {}

  async create(secret: string): Promise<Device> {
    const hash = crypto
    .createHash("md5")
    .update(secret)
    .digest("hex");
    const deviceId = nanoid()
    const device = plainToClass(Device,{secret: hash, deviceId });
    await this.em.persistAndFlush(device);
    return device;
  }

  // async findAll(
  //   findAllContactsDto: FindAllContactsDto,
  // ): Promise<PageDto<ContactDto>> {
  //   const { take, skip, order, orderBy } = findAllContactsDto;
  //   const [contacts, itemCount] = await this.contactRepository.findAndCount(
  //     {},
  //     { limit: take, offset: skip, orderBy: [{ [orderBy]: order }] },
  //   );
  //   const pageMetaDto: PageMetaDto = new PageMetaDto({
  //     pageOptionsDto: findAllContactsDto,
  //     itemCount,
  //   });

  //   return new PageDto<Contact>(contacts, pageMetaDto);
  // }

  // async findOne(id: string): Promise<ContactDto> {
  //   const contact = await this.contactRepository.findOne({ id });

  //   if (!contact) {
  //     throw new EntityNotFoundError(Contact);
  //   }

  //   return contact;
  // }

  // async softDelete(id: string): Promise<void> {
  //   const contact = await this.findOne(id);
  //   wrap(contact).assign({ deletedAt: new Date() });

  //   return this.em.flush();
  // }

  // async update(id: string, data: UpdateContactDto): Promise<ContactDto> {
  //   const contact = await this.findOne(id);

  //   wrap(contact).assign({ ...data });
  //   await this.em.flush();

  //   return contact;
  // }
}
