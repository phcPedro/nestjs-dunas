import { Profiledb } from "@prisma/client";

export class User {
  id?: string;
  email: string;
  name: string;
  password: string;
  cpf: string;
  profile?: Profiledb[];

  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
