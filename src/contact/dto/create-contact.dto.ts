import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role!: string;
}
