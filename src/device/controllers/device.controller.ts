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

@Controller(
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
}
