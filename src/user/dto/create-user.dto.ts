import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, IsUUID,Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description:'email do usuario para login. É unico.',
    example:'pedrocamara@gmail.com',
  })
  email:string;

  @IsString()
  @ApiProperty({
    description:'Nome do usuario. Apenas para exibição.',
    example:'Pedro Henrique Câmara',
  })
  name:string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })

  @IsString()
  @ApiProperty({
    description:'Senha do usuario para login.',
    example:'Porto123Mangu@',
  })
  password:string;

  @IsString()
  @ApiProperty({
    description:'Ditar novamente a senha do usuario para confirmar.',
    example:'Porto123Mangu@',
  })
  confirmPassword:string;

  @IsInt()
  @ApiProperty({
    description:'Coloque seu cpf. Sem ponto ou traço, somente os numeros.',
    example:'12312312312'
  })
  cpf:number;

  @IsUUID(undefined, {each: true})
  @ApiProperty({
    description: 'Lista com os IDs dos perfis.'
  })
  profiles: string[];

  

  creatdAt?: Date;
  updatedAt?: Date;




}
