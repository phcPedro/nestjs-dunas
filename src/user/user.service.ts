import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private userSelect = {
    id:true,
    email: true,
    name: true,
    cpf: true,
    password: true,
    image: true,
    createdAt: true,
    updatedAt: true,
  };


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

  async create(dto:CreateUserDto):Promise<User>{
   if (dto.password != dto.confirmPassword){
    throw new BadRequestException('As senhas não são iguais.');
   }

   delete dto.confirmPassword

    const data: User = {...dto, password: await bcrypt.hash(dto.password, 10)};

    return this.prisma.userdb.create({data}).catch((error)=>{
      console.log(error.message);
      throw new UnprocessableEntityException(error.message);
      return undefined
    });
  }

    async update(id: string, dto: UpdateUserDto): Promise<User>{

      await this.findById(id);

      if (dto.password != dto.confirmPassword){
        throw new BadRequestException('As senhas não são iguais.');
      }

      delete dto.confirmPassword;

      const data: Partial<User> ={...dto};

      if (data.password){
        data.password = await bcrypt.hash(data.password, 10);
      }

      return this.prisma.userdb.update({
        where:{id},
        data,
        select: this.userSelect,
      }).catch(this.handleError);
    }

    async delete (id: string){
      await this.findById(id);

     return this.prisma.userdb.delete({where:{id}});
   }
   handleError(error: Error): undefined{
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine){
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Um erro ocorreu ao executar a operação',
    );

   }






}



