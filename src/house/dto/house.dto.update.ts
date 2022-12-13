import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseDto } from './house.dto.create';
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID} from "class-validator";

export class UpdateHouseDto extends PartialType(CreateHouseDto) {}