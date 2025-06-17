import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

class UserModel {
  static async createUser(userData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  static async findUserByUsername(username) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  static async getAllUsers() {
    return await prisma.user.findMany({
      select: { id: true, username: true, role: true },
    });
  }
}

export default UserModel;
