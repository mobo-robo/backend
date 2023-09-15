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

// import { EntityNotFoundError } from '@/common';
// import { ApiPageOkResponse } from '@/common/decorators';
// import type { PageDto } from '@/common/dtos';
import { Device } from '../entities/device.entity';
import { DeviceService } from '../services/device.service';
import { DEVICE_SERVICE } from '../constants';

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

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @ApiPageOkResponse({ type: ContactDto, description: 'Find all contacts.' })
  // async findAll(
  //   @Query() findAllContactsDto: FindAllContactsDto,
  // ): Promise<PageDto<ContactDto>> {
  //   return this.deviceService.findAll(findAllContactsDto);
  // }

  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({ type: ContactDto, description: 'Find a single contact.' })
  // async findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   try {
  //     return await this.deviceService.findOne(id);
  //   } catch (error) {
  //     if (error instanceof EntityNotFoundError) {
  //       throw new NotFoundException(error.message);
  //     }
  //   }
  // }

  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // @ApiAcceptedResponse({
  //   description: 'Update a contact.',
  //   status: HttpStatus.OK,
  // })
  // async update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() data: UpdateContactDto,
  // ) {
  //   try {
  //     return await this.deviceService.update(id, data);
  //   } catch (error) {
  //     if (error instanceof EntityNotFoundError) {
  //       throw new NotFoundException(error.message);
  //     }
  //   }
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiAcceptedResponse({
  //   description: 'Soft delete a contact.',
  //   status: HttpStatus.NO_CONTENT,
  // })
  // async remove(@Param('id', ParseUUIDPipe) id: string) {
  //   try {
  //     return await this.deviceService.softDelete(id);
  //   } catch (error) {
  //     if (error instanceof EntityNotFoundError) {
  //       throw new NotFoundException(error.message);
  //     }
  //   }
  // }
}
