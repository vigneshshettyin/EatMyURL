import { Redis } from "ioredis";
import { UserDeviceInfo } from "../types/redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";

const redis = new Redis(REDIS_URI);

const emptyUserDeviceInfo: UserDeviceInfo = {
  code: "",
  ip: "",
  browser: "",
  os: "",
  device: "",
};

class RedisQueue {
  private redisClient: Redis;
  private queueName: string;

  constructor(redisClient: Redis, queueName: string) {
    this.redisClient = redisClient;
    this.queueName = queueName;
  }

  async dequeue(timeout: number = 0): Promise<UserDeviceInfo> {
    const result = await this.redisClient.brpop(this.queueName, timeout);
    if (result) {
      const [, message] = result;
      return JSON.parse(message);
    }
    return emptyUserDeviceInfo;
  }

  async quit(): Promise<void> {
    await this.redisClient.quit();
  }
}

const redisHealthCheck = async (): Promise<boolean> => {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error("Redis health check failed:", error);
    return false;
  }
}

const queue = new RedisQueue(redis, "user_anlytics");

export default queue;

export { redisHealthCheck };
