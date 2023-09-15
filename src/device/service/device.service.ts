import { Injectable } from "@nestjs/common";
import { IDeviceService } from "./device.service.interface";
import { DeviceUpdateDto } from "../dto/update.device.dto";
import { DeviceRepository } from "../repositories/device.repository";
import { EntityManager, wrap } from "@mikro-orm/core";
import { Device } from "../entities/device.entity";
import { EntityNotFoundError } from "@/common";

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(
    private readonly em: EntityManager,
    private readonly deviceRepository: DeviceRepository
  ) {}

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
