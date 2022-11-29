import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHouseDto } from './dto/house.dto.create';
import { UpdateHouseDto } from './dto/house.dto.update';
import { House } from './entities/house.entitys';

@Injectable()
export class HouseService {
  constructor(private readonly prisma: PrismaService){}

  findAll(): Promise<House[]>{
    return this.prisma.homedb.findMany();
  }
  create(dto:CreateHouseDto):Promise<House>{
    const data: House = {...dto};

    return this.prisma.homedb.create({data});
    }

    update(id: string, dto: UpdateHouseDto): Promise<House>{
      const data: Partial<House> ={...dto};

      return this.prisma.homedb.update({
        where:{id},
        data,
      });
    }
    async delete (id: string){
      await this.prisma.homedb.delete({where: {id}});
    }
}


