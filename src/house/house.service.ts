import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHouseDto } from './dto/house.dto.create';
import { UpdateHouseDto } from './dto/house.dto.update';
import { House } from './entities/house.entitys';

@Injectable()
export class HouseService {
  constructor(private readonly prisma: PrismaService){}







  async findById(id: string): Promise<House> {
    const record = await this.prisma.homedb.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`ID: '${id}' não encontrado.`)
    }

    return record;
  }

  findAll(): Promise<House[]>{
    return this.prisma.homedb.findMany();
  }

  create(dto:CreateHouseDto):Promise<House>{
    const data: House = {...dto};

    return this.prisma.homedb.create({data}).catch((error)=>{
      console.log(error.message);
      throw new UnprocessableEntityException(error.message);
      return undefined
    });
  }

    async update(id: string, dto: UpdateHouseDto): Promise<House>{
      await this.findById(id);

      const data: Partial<House> ={...dto};

      return this.prisma.homedb.update({
        where:{id},
        data,
      });
    }
    async delete (id: string){
       await this.findById(id);

      return this.prisma.homedb.delete({where:{id}});
    }
}


