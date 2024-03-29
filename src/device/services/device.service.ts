import { MikroORM, UseRequestContext, wrap } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Device } from "../entities/device.entity";
import crypto from "crypto";
import { DeviceRepository } from "../repositories/device.repository";
import { plainToClass } from "class-transformer";
import { nanoid } from "nanoid";
import { IDeviceService } from "./device.service.interface";

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(
    private readonly orm: MikroORM,
    private readonly deviceRepository: DeviceRepository
  ) {}

  async create(secret: string): Promise<Device> {
    const hash = crypto.createHash("md5").update(secret).digest("hex");
    const deviceId = nanoid();
    const device = plainToClass(Device, {
      secret: hash,
      deviceId,
      isConnected: false,
    });
    await this.orm.em.persistAndFlush(device);
    return device;
  }

  async findOne(deviceId: string) {
    const device = await this.deviceRepository.findOne({ deviceId });

    if (!device) {
      return;
    }

    return device;
  }

  @UseRequestContext()
  async softDelete(deviceId: string): Promise<boolean> {
    const device = await this.findOne(deviceId);
    if (!device) return false;
    wrap(device).assign({ deletedAt: new Date() });
    await this.orm.em.flush();
    return true;
  }

  @UseRequestContext()
  async updateDevice(deviceId: string, data: Partial<Device>) : Promise<boolean>{
    const device = await this.findOne(deviceId);
    if (!device) return false;
    wrap(device).assign({ ...data });
    await this.orm.em.flush();
    return true;
  }

  @UseRequestContext()
  async findDevicesToConnect(secret: string) {
    const hash = crypto.createHash("md5").update(secret).digest("hex");
    const device = await this.deviceRepository.find({ secret: hash });
    if (!device) {
      return;
    }
    return device;
  }

  async getClientsToConnect(deviceId: string) {
    const device = await this.deviceRepository.findOne({ deviceId });
    const devicesToConnect = await this.deviceRepository.find({
      secret: device?.secret,
    });
    return devicesToConnect;
  }

  @UseRequestContext()
  async getDevice(id: any, secret: any) {
    if (secret) {
      const hash = crypto.createHash("md5").update(secret).digest("hex");
      const device = await this.deviceRepository.findOne({
        deviceId: id,
        secret: hash,
      });
      return device;
    }
  }
}
