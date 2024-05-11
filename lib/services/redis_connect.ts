import Redis from "ioredis";

class RedisClientManager {
  private static instance: RedisClientManager;
  private redisClient: Redis;
  private publicRedisClient: Redis;

  private constructor() {
    this.redisClient = new Redis(`${process.env.REDIS_URL}/0`);
    this.publicRedisClient = new Redis(`${process.env.REDIS_URL}/1`);
  }

  public static getInstance(): RedisClientManager {
    if (!RedisClientManager.instance) {
      RedisClientManager.instance = new RedisClientManager();
    }
    return RedisClientManager.instance;
  }

  public getRedisClient(): Redis {
    return this.redisClient;
  }

  public getPublicRedisClient(): Redis {
    return this.publicRedisClient;
  }

  public async checkStatus() {
    try {
      const redis_status = await this.redisClient.ping();
      const public_redis_status = await this.publicRedisClient.ping();
      return redis_status === "PONG" && public_redis_status === "PONG";
    } catch (e) {
      return false;
    }
  }

  public async disconnect() {
    await this.redisClient.disconnect();
    await this.publicRedisClient.disconnect();
  }
}

export default RedisClientManager;