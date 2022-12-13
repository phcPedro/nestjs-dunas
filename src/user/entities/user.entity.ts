import { Profiledb } from "@prisma/client";

export class User {
  id?: string;
  email: string;
  name: string;
  password: string;
  cpf: number;
  profile?: Profiledb[];

  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
