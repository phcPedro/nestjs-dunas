import { Profiledb } from "@prisma/client";

export class House{
  id?: string;
  title: string;
  value: string;
  location:  string;
  information: string;
  img: string;
  profiles?: Profiledb[]
  createdAt?: Date;
  updatedAt?:Date;
}