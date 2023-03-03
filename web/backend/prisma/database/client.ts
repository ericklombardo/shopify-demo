import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export const exec = async <T>(cb: (client: PrismaClient) => Promise<T>) => {
  try {
    return cb(prisma);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
