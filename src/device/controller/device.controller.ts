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
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { IDeviceService } from "../service/device.service.interface";
import { DEVICE_SERVICE } from "../constants";
import { ApiAcceptedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DeviceUpdateDto } from "../dto/update.device.dto";
import { EntityNotFoundError } from "@/common";
import { DeviceDto } from "../dto/device.dto";

@Controller({
    path: 'device',
    version: '1',
})
@ApiTags('device')
export class DeviceController {
  constructor(
    @Inject(DEVICE_SERVICE)
    private readonly deviceService: IDeviceService
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DeviceDto, description: 'Find a single device.' })
  async findOne(@Param('id', ParseUUIDPipe) deviceId: string) {
    try {
      return await this.deviceService.findOne(deviceId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error);
      }
    }
  }

  @Post("/update")
  @HttpCode(HttpStatus.OK)
  @ApiAcceptedResponse({
    description: "Update a device.",
    status: HttpStatus.OK,
  })
  async updateDevice(@Body() data: DeviceUpdateDto) {
    try {
      return this.deviceService.updateDevice(data);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiAcceptedResponse({
    description: 'Soft delete a device.',
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id', ParseUUIDPipe) deviceId: string) {
    try {
      return await this.deviceService.softDelete(deviceId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error);
      }
    }
  }

}
