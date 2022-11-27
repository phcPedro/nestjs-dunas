import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID } from "class-validator";

export class CreateHouseDto{

  @IsUUID()
  @ApiProperty({
    description:"House Id.",
    example:"c29c586e-7fad-435c-8b5e-5b1c3d897985"
  })
  houseId:string;

  @IsString()
  @ApiProperty({
    description:"House description.",
    example:"This house has two rooms."
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description:"Home image url",
    example:"https://plantasdecasas.com/wp-content/webpc-passthru.php?src=https://plantasdecasas.com/wp-content/uploads/2014/07/309-plantas-de-casas-fachadas-front1-1.jpg&nocache=1"
  })
  img: string;

  @IsString()
  @ApiProperty({
    description:"Title for presentation",
    example:"House in Santo Antonio Brazil"
  })
  description: string;
}
