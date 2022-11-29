import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseDto } from './house.dto.create';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {}