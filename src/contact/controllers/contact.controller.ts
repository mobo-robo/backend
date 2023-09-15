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

import { EntityNotFoundError } from '@/common';
import { ApiPageOkResponse } from '@/common/decorators';
import type { PageDto } from '@/common/dtos';

import { CONTACT_SERVICE } from '../constants';
import { ContactDto, CreateContactDto, UpdateContactDto } from '../dto';
import { FindAllContactsDto } from '../dto/findall-contact-dto';
import { IContactService } from '../services';

@Controller({
  path: 'contacts',
  version: '1',
})
@ApiTags('contacts')
export class ContactController {
  constructor(
    @Inject(CONTACT_SERVICE)
    private readonly contactService: IContactService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: ContactDto,
    description: 'Creates a new contact.',
  })
  async create(@Body() data: CreateContactDto) {
    return this.contactService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({ type: ContactDto, description: 'Find all contacts.' })
  async findAll(
    @Query() findAllContactsDto: FindAllContactsDto,
  ): Promise<PageDto<ContactDto>> {
    return this.contactService.findAll(findAllContactsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ContactDto, description: 'Find a single contact.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.contactService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiAcceptedResponse({
    description: 'Update a contact.',
    status: HttpStatus.OK,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateContactDto,
  ) {
    try {
      return await this.contactService.update(id, data);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiAcceptedResponse({
    description: 'Soft delete a contact.',
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.contactService.softDelete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
