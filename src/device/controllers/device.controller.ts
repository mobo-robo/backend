import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { Device } from "../entities/device.entity";
import { DeviceService } from "../services/device.service";
import { DEVICE_SERVICE } from "../constants";
import { DeviceDto, DeviceUpdateDto } from "../dto";
import { EntityNotFoundError } from "@/common";
import { IDeviceService } from "../services";

@Controller({
  path: "device",
  version: "1",
})
@ApiTags("device")
export class DeviceController {
  constructor(
    @Inject(DEVICE_SERVICE)
    private readonly deviceService: IDeviceService
  ) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Device,
    description: "Creates a new device.",
  })
  async create(@Body() data: { secret: string }) {
    return this.deviceService.create(data.secret);
  }

  @Get(':deviceId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DeviceDto, description: "Find a single device." })
  async findOne(@Param('deviceId') deviceId: string) {
    try {
      return await this.deviceService.findOne(deviceId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error);
      }
    }
  }

  @Put(':deviceId')
  @HttpCode(HttpStatus.OK)
  @ApiAcceptedResponse({
    description: "Update a device.",
    status: HttpStatus.OK,
  })
  async updateDevice(
    @Param('deviceId') deviceId: string,
    @Body() data: DeviceUpdateDto
  ) {
    try {
      return this.deviceService.updateDevice(deviceId, data);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error);
      }
      throw error;
    }
  }

  @Delete(':deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiAcceptedResponse({
    description: "Soft delete a device.",
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('deviceId') deviceId: string) {
    try {
      return await this.deviceService.softDelete(deviceId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error);
      }
    }
  }
}
