import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

class UserService {
  static async getAllUsers() {
    return prisma.user.findMany({
      select: { id: true, username: true, role: true },
    });
  }
  static async getById(id) {
    return prisma.user.findFirst({ where: { id } });
  }
  static async getByUsername(username) {
    return prisma.user.findUnique({ where: { username } });
  }
  static async getAdmin() {
    return prisma.user.findFirst({ where: { role: "ADMIN" } });
  }
}

export default UserService;
