import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Get()
  @ApiOperation({
    summary:'Visualizar casas cadastradas.'
  })
  findAll(): Promise<User[]>{
    return this.userService.findAll();
  }
  @Post()
  @ApiOperation({
    summary: 'Cadastra uma casa',
  })
  create(@Body() dto: CreateUserDto): Promise<User>{
    return this.userService.create(dto);

  }
  @Patch(':id')
  @ApiOperation({
    summary:'Editar uma casa cadastrada.'
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User>{
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id')id: string){
    try {
      return this.userService.delete(id);
    } catch (error) {
      throw new Error(error);

    }

  }

}
