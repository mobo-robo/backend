import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Device } from '../entities/device.entity';
import crypto from "crypto";
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
}
