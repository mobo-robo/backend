import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Device } from '../entities/device.entity';
import crypto from "crypto";
import { DeviceRepository } from '../repositories/device.repository';
import { plainToClass } from 'class-transformer';
import { nanoid } from 'nanoid'
import { EntityNotFoundError } from '@/common';
import { DeviceUpdateDto } from '../dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly em: EntityManager,
    private readonly deviceRepository: DeviceRepository
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
async findOne(deviceId: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({ deviceId });

    if (!device) {
      throw new EntityNotFoundError(Device);
    }

    return device;
  }

  async softDelete(deviceId: string): Promise<void> {
    const contact = await this.findOne(deviceId);
    wrap(contact).assign({ deletedAt: new Date() });

    return this.em.flush();
  }

  async updateDevice(data: DeviceUpdateDto): Promise<boolean> {
    const device = await this.findOne(data.deviceId);

    wrap(device).assign({ ...data });
    await this.em.flush();
    return true;
  }
}
