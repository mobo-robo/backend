import { DeviceUpdateDto } from "../dto/update.device.dto";
import { Device } from "../entities/device.entity";

export interface IDeviceService {
  create(secret: string): Promise<Device>
  updateDevice(deviceId: string, data: DeviceUpdateDto): Promise<boolean>;
  findOne(id: string);
  softDelete(id: string): Promise<boolean>;
}
