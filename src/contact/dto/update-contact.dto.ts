import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly role?: string;
}
