import Redis from "ioredis";

class RedisClientManager {
  private static instance: RedisClientManager;
  private redisClient: Redis;
  private publicRedisClient: Redis;
  private pubSubRedisClient: Redis;

  private constructor() {
    this.redisClient = new Redis(`${process.env.REDIS_URL}/0`);
    this.publicRedisClient = new Redis(`${process.env.REDIS_URL}/1`);
    this.pubSubRedisClient = new Redis(`${process.env.REDIS_URL}/2`);
  }

  public static getInstance(): RedisClientManager {
    if (!RedisClientManager.instance) {
      RedisClientManager.instance = new RedisClientManager();
    }
    return RedisClientManager.instance;
  }

  public getPubSubRedisClient(): Redis {
    return this.pubSubRedisClient;
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
    this.redisClient.disconnect();
    this.publicRedisClient.disconnect();
  }
}

export default RedisClientManager;
