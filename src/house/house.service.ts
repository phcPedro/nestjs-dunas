import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { title } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.utils';
import { CreateHouseDto } from './dto/house.dto.create';
import { UpdateHouseDto } from './dto/house.dto.update';
import { House } from './entities/house.entitys';

@Injectable()
export class HouseService {
  constructor(private readonly prisma: PrismaService){}





  async findById(id: string){
    const record = await this.prisma.homedb.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`ID: '${id}' não encontrado.`)
    }

    return record;
  }

  findAll(){
    return this.prisma.homedb.findMany({
      select: {
        title: true,
        value: true,
        location: true,
        information: true,
        img: true,
        _count: {select:{ profiles: true,}}
      }

    });
  }

  create(dto:CreateHouseDto){
    const data: Prisma.HomedbCreateInput ={
      title: dto.title,
      value: dto.value,
      location: dto.location,
      img: dto.img,
      information: dto.information,


    }

    return this.prisma.homedb.create({data}).catch((error)=>{
      console.log(error.message);
      throw new UnprocessableEntityException(error.message);
      return undefined
    });
  }

    async update(id: string, dto: UpdateHouseDto): Promise<House>{
      await this.findById(id);

      const data: Prisma.HomedbUpdateInput ={
        title: dto.title,
        value: dto.value,
        location: dto.location,
        information: dto.information,
        img: dto.img
      }
      return this.prisma.homedb.update({
        where:{id},
        data,
        select:{
          title: true,
          value: true,
          location: true,
          information: true,
          img: true,
        }
      }).catch(handleError);
    }

    async delete (id: string){
      await this.findById(id);

     return this.prisma.homedb.delete({where:{id}});
   }







    }



