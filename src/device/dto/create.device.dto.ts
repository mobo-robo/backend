import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    deviceId!: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    secret!: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    latitude?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    longitude?: string;
}