import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHouseDto } from "./dto/create-house.dto";
import { House } from "./entities/house.entity";


@Injectable()
export class HouseService {
houses: House[] = [];

  constructor(private readonly prisma: PrismaService){}


  findAll(): Promise<House[]>{
    return this.prisma.houses.findMany();
  }

async create(dto: CreateHouseDto): Promise<House>{
    const endity = {...dto, id:randomUUID()};
    this.houses.push(endity);
    return endity;





  }
}
