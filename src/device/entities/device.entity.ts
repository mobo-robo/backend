import { Entity, EntityRepositoryType, Property } from "@mikro-orm/core";
import { AbstractBaseEntity } from "@/common/entities";
import { DeviceRepository } from "../repositories/device.repository";
@Entity({ customRepository: () => DeviceRepository })
export class Device extends AbstractBaseEntity {
  [EntityRepositoryType]?: DeviceRepository;
  @Property()
  deviceId!: string;
  @Property()
  secret!: string;
  @Property({nullable: true})
  latitude?: string;
  @Property({nullable: true})
  longitude?: string;
}
