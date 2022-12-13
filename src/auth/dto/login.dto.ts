import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginDto{
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description:'Email do usuario.',
    example:'pedrocamara@gmail.com'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Digite a senha.',
    example:'Porto123Mangu@',
  })
  password: string;

}