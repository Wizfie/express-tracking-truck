import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};
const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
};

export { createUser, findUserByUsername };
