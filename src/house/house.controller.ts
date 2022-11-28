import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateHouseDto } from "./dto/create-house.dto";
import { HouseService } from "./house.service";
import { House } from "./entities/house.entity";

@ApiTags(
)
@Controller('house')
export class HouseController{
 constructor(private houseService: HouseService){}

  @Get()
  async findAll(): Promise<House[]>{
   return await this.houseService.findAll();
  }

  @Post()
  async create(@Body()createHouseDto: CreateHouseDto): Promise<House>{
    try{
    return this.houseService.create(createHouseDto);
   }catch(error){
    console.log(error);
   }
  }

}
