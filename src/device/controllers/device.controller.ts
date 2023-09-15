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
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Device } from '../entities/device.entity';
import { DeviceService } from '../services/device.service';
import { DEVICE_SERVICE } from '../constants';
import { DeviceDto, DeviceUpdateDto } from '../dto';
import { EntityNotFoundError } from '@/common';

@Controller(
  // 'device'
  {
  path: 'device',
  version: '1',
}
)
@ApiTags('device')
export class DeviceController {
  constructor(
    @Inject(DEVICE_SERVICE)
    private readonly deviceService: DeviceService
  ) {}

  
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Device,
    description: 'Creates a new device.',
  })
  async create(@Body() data: {secret: string}) {
    return this.deviceService.create(data.secret);
  }

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
