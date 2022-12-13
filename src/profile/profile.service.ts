import {
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.utils';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const record = await this.prisma.profiledb.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`ID: '${id}' não encontrado.`);
    }

    return record;
  }

  async findAll(userId: string){
    const profileList = await this.prisma.profiledb.findMany({
      where: {userId},
      select:{
        id: true,
        title: true,
        imageUrl: true,
        _count: {select:{houses: true}},
      },
    });
    if (profileList.length === 0){
      throw new NotFoundException(
        'Não existe perfis nessa conta.',
      );
    }
    return profileList;
  }

create(dto: CreateProfileDto ) {
    const data: Prisma.ProfiledbCreateInput ={
      user: {
        connect:{
          id: dto.user,
        }
      },
      title: dto.title,
      imageUrl: dto.imageUrl,



    }
    this.prisma.profiledb.create({data}).catch(handleError);
  }

 update(dto:UpdateProfileDto){
  const data: Prisma.ProfiledbUpdateInput = {
    title: dto.title,
    imageUrl: dto.imageUrl
  }
  this.prisma.profiledb.update({
    data,
    where: undefined
  }).catch(handleError);
 }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.profiledb.delete({ where: { id } });

    throw new HttpException('Deletado com sucesso.', 204);
  }



}
