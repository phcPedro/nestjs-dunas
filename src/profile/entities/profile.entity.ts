import { Userdb, Homedb } from "@prisma/client";

export class Profile {
  id?: string;
  title?: string;
  imageUrl?: string;
  user?: Userdb[];
  houses?: Homedb[];
  createdAt?: Date;
  updatedAt?: Date;

}
