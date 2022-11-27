import { Injectable } from "@nestjs/common";
import { CreateHouseDto } from "./dto/create-house.dto";


@Injectable()
export class HouseService {
  findAll() {
    return 'Buscar todas as mesas';
  }

  create(createHouseDto: CreateHouseDto) {
    return 'Create House: '+ JSON.stringify(createHouseDto);
  }
}
