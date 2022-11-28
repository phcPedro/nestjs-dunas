import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HouseController } from "./house.controller";
import { HouseService } from "./house.service";

@Module({
  imports: [PrismaModule],
  controllers:[HouseController],
  providers:[HouseService],
})

export class HouseModule{}
