import PrismaClientManager from "./pgSingelton";

const prisma = PrismaClientManager.getInstance().getPrismaClient();

export default prisma;
