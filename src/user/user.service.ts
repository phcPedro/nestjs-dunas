import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}





  async findById(id: string){
    const record = await this.prisma.userdb.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`ID: '${id}' não encontrado.`)
    }

    return record;
  }

  findAll(): Promise<User[]>{
    return this.prisma.userdb.findMany();
  }

  create(dto:CreateUserDto):Promise<User>{
    const data: User = {...dto};

    return this.prisma.userdb.create({data}).catch((error)=>{
      console.log(error.message);
      throw new UnprocessableEntityException(error.message);
      return undefined
    });
  }

    async update(id: string, dto: UpdateUserDto): Promise<User>{
      await this.findById(id);

      const data: Partial<User> ={...dto};

      return this.prisma.userdb.update({
        where:{id},
        data,
      });
    }

    async delete (id: string){
      await this.findById(id);

     return this.prisma.userdb.delete({where:{id}});
   }







    }



