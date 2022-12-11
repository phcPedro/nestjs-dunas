import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService){}





  async findById(id: string){
    const record = await this.prisma.profiledb.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`ID: '${id}' não encontrado.`)
    }

    return record;
  }

  findAll(): Promise<Profile[]>{
    return this.prisma.profiledb.findMany();
  }

  create(dto:CreateProfileDto):Promise<Profile>{
    const data: Profile = {...dto};

    return this.prisma.profiledb.create({data}).catch((error)=>{
      console.log(error.message);
      throw new UnprocessableEntityException(error.message);
      return undefined
    });
  }

    async update(id: string, dto: UpdateProfileDto): Promise<Profile>{
      await this.findById(id);

      const data: Partial<Profile> ={...dto};

      return this.prisma.profiledb.update({
        where:{id},
        data,
      });
    }

    async delete (id: string){
      await this.findById(id);

     return this.prisma.profiledb.delete({where:{id}});
   }







    }



