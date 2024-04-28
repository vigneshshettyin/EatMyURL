import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const getPrisma = (): PrismaClient => {
  if (!!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

export default getPrisma;
