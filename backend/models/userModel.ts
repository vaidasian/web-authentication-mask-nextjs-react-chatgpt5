import { prisma } from "@/backend/lib/prisma";

export const createUser = async (email: string, username: string, passwordHash: string) => {
  return await prisma.user.create({
    data: { email, username, password: passwordHash },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findUserByName = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};
