import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHouseDto } from './dto/house.dto.create';
import { UpdateHouseDto } from './dto/house.dto.update';
import { House } from './entities/house.entitys';
import { HouseService } from './house.service';


@ApiTags('House')
@Controller('house')
export class HouseController {
  constructor(private readonly houseService:HouseService) {}

  @Get()
  @ApiOperation({
    summary:'Visualizar casas cadastradas.'
  })
  findAll(): Promise<House[]>{
    return this.houseService.findAll();
  }
  @Post()
  @ApiOperation({
    summary: 'Cadastra uma casa',
  })
  create(@Body() dto: CreateHouseDto): Promise<House>{
    return this.houseService.create(dto);

  }
  @Patch(':id')
  @ApiOperation({
    summary:'Editar uma casa cadastrada.'
  })
  update(@Param('id') id: string, @Body() dto: UpdateHouseDto): Promise<House>{
    return this.houseService.update(id, dto);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   try {
  //     return this.houseService.delete(id);
  //   } catch (error) {
  //     throw new Error(error);
  //   }

  @Delete(':id')
  async delete(@Param('id')id: string){
    try {
      return this.houseService.delete(id);
    } catch (error) {
      throw new Error(error);

    }

  }

}
