import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handle-error.utils';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    email: true,
    name: true,
    cpf: true,
    password: true,
    image: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const record = await this.prisma.userdb.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`ID: '${id}' não encontrado.`);
    }

    return record;
  }

  findAll(){
    return this.prisma.userdb.findMany({
      select: {
        name: true,
        email: true,
        cpf: true,
        id: true,
        password: false,
        isAdmin: false,
        createdAt: true,
        _count: {select:{ profile: true,}}
      }

    });
  }

  async create(dto: CreateUserDto) {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserdbCreateInput = {
      email: dto.email,
      name: dto.name,
      cpf: dto.cpf,
      password: await bcrypt.hash(dto.password, 10),


    };

    return this.prisma.userdb.create({
      data,
      select:{
        id: true,
        name: true,
        email: true,
        cpf: true,
        password: true,
        isAdmin: true,
        createdAt: true,
        updateAt: true,

      }
    })
    .catch(handleError);

  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserdbUpdateInput = {
      email: dto.email,
      name: dto.name,
      cpf: dto.cpf,
      password: await bcrypt.hash(dto.password, 10)

    };

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.userdb
      .update({
        where: { id },
        data,
        include:{
         _count:{select:{profile:true}},
        }

      })
      .catch(handleError);
  }

  async delete(userId: string) {
    await this.findById(userId);

    await this.prisma.userdb.delete({ where: { id: userId } });

    throw new HttpException('Deletado com sucesso.', 204);
  }
}
