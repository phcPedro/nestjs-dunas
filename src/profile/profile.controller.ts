import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateProfileDto} from './dto/create-profile.dto';
import { ProfileService } from './profile.service';


@ApiTags('Profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Visualizar perfis de usuarios.',
  })
  findAll(@LoggedUser()user:User) {
    return this.profileService.findAll(user.id);
  }
  @Post()
  @ApiOperation({
    summary: 'Cadastrar perfil.',
  })
  create(@Body() dto: CreateProfileDto){
    return this.profileService.create(dto);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil.',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@LoggedUser()user:User){
    return this.profileService.update;
  }




  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um perfil.',
  })
  async delete(@Param('id') id: string) {
    try {
      return this.profileService.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
