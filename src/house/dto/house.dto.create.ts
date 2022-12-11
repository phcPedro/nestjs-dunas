import { ApiProperty } from "@nestjs/swagger";
import { isLocale, IsString, IsUrl} from "class-validator";

export class CreateHouseDto{



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
    description:"Valor monetario do imovel.",
    example:"1.150.000"
  })
  value: string;

  @IsString()
  @ApiProperty({
    description:"Endereço do imovel.",
    example:"Rua Dário Manoel Cardoso, 2860 - Ingleses do Rio Vermelho, Florianópolis - SC"
  })
  location: string;

  @IsString()
  @ApiProperty({
    description:"Diferente do titulo, coloque mais informçãoes sobre o imovel.",
    example:"O sobrado no bairro Ingleses do Rio Vermelho com 150 metros quadrados com 3 quartos sendo 2 suítes e 3 banheiros  Vai lhe possibilitar curtir os dias mais quentes na piscina. Já está com os móveis. Possui circuito de segurança, piscina e jacuzzi, todo em mármore branco."
  })
  information: string

}