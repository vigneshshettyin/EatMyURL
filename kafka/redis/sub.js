const Redis = require("ioredis");

const ProducerController = require("../controller/producer");

const redis = new Redis(process.env.REDIS_URI);

// Queue implementation
class RedisQueue {
  constructor(redisClient, queueName) {
    this.redisClient = redisClient;
    this.queueName = queueName;
  }

  // Add a message to the queue
  async enqueue(message) {
    await this.redisClient.lpush(this.queueName, JSON.stringify(message));
  }

  // Get a message from the queue with blocking pop
  async dequeue(timeout = 0) {
    const result = await this.redisClient.brpop(this.queueName, timeout);
    if (result) {
      const [, message] = result;
      return JSON.parse(message);
    }
    return null; // Return null if timeout occurred and no message was available
  }
}

let running = true;

async function processQueue() {
  const queue = new RedisQueue(redis, 'user_anlytics');
  
  while (running) {
    try {
      const message = await queue.dequeue(10);
      if (message) {
        console.log('Dequeued message:', message);
        const { ip, browser, os, device, code } = JSON.parse(message);
        ProducerController.produce_logic(ip, browser, os, device, code);
      }
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  }

  // Close the connection when done
  redis.quit();
}

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down...');
  running = false;
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down...');
  running = false;
});

// Start processing the queue
processQueue();