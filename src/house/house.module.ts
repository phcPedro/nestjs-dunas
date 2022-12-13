import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
