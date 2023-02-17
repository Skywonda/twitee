import { PrismaClient, Prisma } from "@prisma/client";
import { ConflictError, NotFoundError } from "../errors/errors";
import { hashPassword } from "../utils/helper";
const prisma = new PrismaClient();

import { CreateUserDto } from "./entity/type";
import { PrismaQuery } from "../controllers/entity/interfaces";

class UserService {
  static async createUser(data: CreateUserDto) {
    const userExist = await this.findUserByEmail(data.email);
    if (userExist) throw new ConflictError("This user already exist!");
    data.password = await hashPassword(data.password);
    const user = await prisma.user.create({ data });
    return user;
  }

  static async findUsers(where: PrismaQuery) {
    const user = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
    return user;
  }

  static async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  static async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      rejectOnNotFound: false,
    });
    return user;
  }

  static async updateUser(id: string, data: CreateUserDto) {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }

  static async deleteUser(id: string) {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }
}

export default UserService;
