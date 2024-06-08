import { Redis } from 'ioredis';
import {UserDeviceInfo} from './types.js'

// Create a Redis client instance
const redis = new Redis(process.env.REDIS_URI);

class RedisQueue {
  private redisClient: Redis;
  private queueName: string;

  constructor(redisClient: Redis, queueName: string) {
    this.redisClient = redisClient;
    this.queueName = queueName;
  }

  // Dequeue a message from the Redis list with an optional timeout
  async dequeue(timeout: number = 0): Promise<UserDeviceInfo> {
    const result = await this.redisClient.brpop(this.queueName, timeout);
    if (result) {
      const [, message] = result;
      return JSON.parse(message);
    }
    return null;
  }

  async quit(): Promise<void> {
    await this.redisClient.quit();
  }

}

// Usage example
const queue = new RedisQueue(redis, 'user_anlytics');

export default queue;
