import { DeviceUpdateDto } from "../dto/update.device.dto";
import { Device } from "../entities/device.entity";

export interface IDeviceService {
  updateDevice(data: DeviceUpdateDto): Promise<boolean>;
  findOne(id: string): Promise<Device>;
  softDelete(id: string): Promise<void>;
}
