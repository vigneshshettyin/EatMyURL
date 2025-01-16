import { PrismaClient } from "@prisma/client";

class PrismaClientManager {
  private static instance: PrismaClientManager;
  private prismaClient: PrismaClient;

  private constructor() {
    // Use an existing global PrismaClient instance if available, otherwise create a new one
    if (!global.prismaClient) {
      global.prismaClient = new PrismaClient();
    }
    this.prismaClient = global.prismaClient;
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
      console.error("Prisma checkStatus error:", e);
      return false;
    }
  }

  public async disconnect() {
    await this.prismaClient.$disconnect();
  }
}

export default PrismaClientManager;

// Declare a global variable for PrismaClient to persist across reloads
declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined;
}
