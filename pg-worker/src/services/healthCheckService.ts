import { prisma } from "../connection/prisma";
import { redisHealthCheck } from "../connection/redis";

export const performHealthCheck = async (): Promise<any> => {
  try {
    // Check Database connection
    await prisma.$queryRaw`SELECT 1`;

    // Check Redis connection
    const redisStatus = await redisHealthCheck();

    // Get system metrics
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // Convert bytes to MB

    return {
      status: "ok",
      uptime: `${uptime.toFixed(2)} seconds`,
      memoryUsage: `${memoryUsage.toFixed(2)} MB`,
      database: "healthy",
      redis: redisStatus ? "healthy" : "unhealthy",
    };
  } catch (error) {
    console.error("Health check failed:", error);
    throw new Error("Health check failed");
  }
};
