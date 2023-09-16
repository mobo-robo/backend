import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DeviceUpdateDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    secret?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    latitude?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    longitude?: string;
}