import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';


@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService:ProfileService) {}

  @Get()
  @ApiOperation({
    summary:'Visualizar perfis de usuarios.'
  })
  findAll(): Promise<Profile[]>{
    return this.profileService.findAll();
  }
  @Post()
  @ApiOperation({
    summary: 'Cadastrar perfil.',
  })
  create(@Body() dto: CreateProfileDto): Promise<Profile>{
    return this.profileService.create(dto);

  }
  @Patch(':id')
  @ApiOperation({
    summary:'Editar um perfil.'
  })
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto): Promise<Profile>{
    return this.profileService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um perfil.'
  })
  async delete(@Param('id')id: string){
    try {
      return this.profileService.delete(id);
    } catch (error) {
      throw new Error(error);

    }

  }

}
