import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID, Length } from "class-validator";

export class CreateProfileDto {
@IsString()
@Length(3,15)
@ApiProperty({
  description:"Nome do perfil. Deve conter no minimo 3 caracteres e maximo 10.",
  example:"Dom_Pedro"
})
title: string;

@IsUrl()
@ApiProperty({
  description:"Url para foto do perfil",
  example:"https://avatars.githubusercontent.com/u/68974506?v=4"
})
imageUrl: string;

@IsUUID(undefined, {each: true})
@ApiProperty({
  description: 'Id do usuario do perfil.',
  example:"390e9047-c165-4a2c-bc99-06b33498567e"
})
user: string;






}