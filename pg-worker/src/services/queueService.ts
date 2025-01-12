import RedisQueue from "../connection/redis";
import { UserDeviceInfo } from "../types/redis";

export class QueueService {
  private readonly batchSize: number;

  constructor(batchSize: number = 10) {
    this.batchSize = batchSize;
  }

  async dequeueBatch(): Promise<UserDeviceInfo[]> {
    const messages: UserDeviceInfo[] = [];
    for (let i = 0; i < this.batchSize; i++) {
      const message = await RedisQueue.dequeue(10);
      if (message) {
        if (!message.code || message.code.trim() === "") {
          continue;
        }
        console.log(`Dequeued message: ${JSON.stringify(message)}`);

        messages.push(message);
      } else {
        break;
      }
    }
    return messages;
  }

  async quit(): Promise<void> {
    await RedisQueue.quit();
  }
}
