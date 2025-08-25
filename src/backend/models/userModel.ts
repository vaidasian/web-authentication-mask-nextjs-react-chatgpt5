// backend/src/models/userModel.ts
import { prisma } from "@/backend/lib/prisma";

export const createUser = async (email: string, passwordHash: string) => {
  return await prisma.user.create({
    data: { email, password: passwordHash },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
