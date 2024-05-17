import { PrismaClient } from "@prisma/client";

class PrismaClientManager {
  private static instance: PrismaClientManager;
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = new PrismaClient();
  }

  public static getInstance(): PrismaClientManager {
    if (!PrismaClientManager.instance) {
      PrismaClientManager.instance = new PrismaClientManager();
    }
    return PrismaClientManager.instance;
  }

  public getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }

  public async checkStatus() {
    try {
      return await this.prismaClient.$queryRaw`SELECT 'OK!' as result`;
    } catch (e) {
      return false;
    }
  }

  public async disconnect() {
    await this.prismaClient.$disconnect();
  }
}

export default PrismaClientManager;
