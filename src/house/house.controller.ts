import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateHouseDto } from "./dto/create-house.dto";
import { HouseService } from "./house.service";

@ApiTags(
)
@Controller('house')
export class HouseController{
 constructor(private houseService: HouseService){}

  @Get()
  findAll(){
   return this.houseService.findAll();
  }

  @Post()
  create(@Body()createHouseDto: CreateHouseDto){
    return this.houseService.create(createHouseDto);
  }
}
