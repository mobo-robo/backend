import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { PageOptionsDto } from '@/common';

export class FindAllContactsDto extends PageOptionsDto {
  @ApiProperty()
  @IsIn(['name', 'createdAt'])
  orderBy: string;
}
