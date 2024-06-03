const Redis = require("ioredis");

const ProducerController = require("../controller/producer");

const redis = new Redis(process.env.REDIS_URI);

class RedisQueue {
  constructor(redisClient, queueName) {
    this.redisClient = redisClient;
    this.queueName = queueName;
  }

  async enqueue(message) {
    await this.redisClient.lpush(this.queueName, JSON.stringify(message));
  }

  async dequeue(timeout = 0) {
    const result = await this.redisClient.brpop(this.queueName, timeout);
    if (result) {
      const [, message] = result;
      return JSON.parse(message);
    }
    return null;
  }
}

let running = true;

async function processQueue() {
  const queue = new RedisQueue(redis, "user_anlytics");

  while (running) {
    try {
      const message = await queue.dequeue(10);
      if (message) {
        const { ip, browser, os, device, code } = message;
        ProducerController.produce_logic(ip, browser, os, device, code);
      }
    } catch (error) {
      console.error("Error processing queue:", error);
    }
  }
  redis.quit();
}

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down...");
  running = false;
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down...");
  running = false;
});

processQueue();
