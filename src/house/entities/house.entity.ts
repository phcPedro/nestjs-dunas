import { CreateHouseDto } from "../dto/create-house.dto";

export interface House extends CreateHouseDto{
  id: string;

}
