import {
  Body,
  Controller,
  Delete,
  Get,
  UseGuards,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Visualizar usuarios cadastrados.',
  })
  findAll(){
    return this.userService.findAll();
  }
  @Post('user')
  @ApiOperation({
    summary: 'Cadastrar um novo usaurio.',
  })
  create(@Body()dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar informações de um usuario cadastrado.',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar um usuario pelo id.',
  })
  async delete(@Param('id') id: string) {
    try {
      return this.userService.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
